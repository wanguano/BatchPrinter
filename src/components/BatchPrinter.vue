<template>
  <div>
    <el-button type="primary" @click="handlePrintHtml">查询</el-button>
    <el-button type="primary" @click="handlePrintHtml">批量打印</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import { getLodop } from '@/util/LodopFuncs.js'
// import { htmlArr } from '@/local/batch_html'
import { getPrintHtml } from '@/service/batchPrinter'
import { ElMessage } from 'element-plus';
export default {
  setup() {
    // props/state
    // event function
    // console.log('htmlArr :>>>', htmlArr)
    const handlePrintHtml = async () => {
      for (let i = 0; i < 5; i++) {
        await printEveryItem(i)
        console.log('2')
      }
    }

    /* 请求HTML */
    const printEveryItem = async (i) => {
      return new Promise((resolve) => {
        getPrintHtml(i).then((result) => {
          let LODOP = getLodop() // 调用getLodop获取LODOP对象
          if (!(LODOP && LODOP.VERSION)) {
            ElMessage.warning(
              {
                message: `
                <p>Web打印服务CLodop未安装启动</p> <br>
                <p>点击这里<a style="color:rgb(0,0,238)"  href='http://www.lodop.net/download/Lodop6.226_Clodop4.127.zip' target='_blank'>下载执行安装</a></p> <br>
                <p style="color:#999">(若此前已安装过，可<a style="color:rgb(0,0,238)" href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>)</p> <br>
                <p>成功后请刷新本页面。</p> <br> Web打印服务CLodo`,
                dangerouslyUseHTMLString: true,
              }
            );
            return
          }
          LODOP.NewPage();
          let strStyleCSS = `<style type='text/css' rel='stylesheet'>table { display: inline-block; }table tbody tr td div{position: static !important;}.d2{position: static !important;}</style>`;
          let htmlStr = result + strStyleCSS;
          LODOP.PRINT_INIT("");
          LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4');
          // LODOP.SET_PRINT_PAGESIZE(intOrient, 0, 0, paperTypeObj.type);

          LODOP.ADD_PRINT_IMAGE(10, 10, '100%', '100%', htmlStr);
          LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
          LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "60%");
          // LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", zoomRatio);
          // LODOP.SET_PRINTER_INDEXA(printer);// 选择Windows默认打印设置：传递打印机名或序号
          LODOP.SET_PRINT_STYLEA(0, "ItemType", 4);
          LODOP.SET_PRINT_STYLEA(0, "Horient", 3);
          LODOP.SET_PRINT_STYLEA(0, "Vorient", 3);
          LODOP.SET_PRINT_MODE("CUSTOM_TASK_NAME", "中文学位证书打印"); // 为每个打印单独设置任务名
          // 页码
          // console.log(`右下脚的页号：第${pageNumber}页/共${totalPageNumber}条`)
          // LODOP.ADD_PRINT_TEXT(421,542,165,22,`页号：第${pageNumber}页/共${totalPageNumber}条`);
          // LODOP.SET_PRINT_STYLEA(0,"ItemType",2);
          // LODOP.SET_PRINT_STYLEA(0,"Horient",1);
          // LODOP.SET_PRINT_STYLEA(0,"Vorient",1);
          setTimeout(() => {
            resolve()
            ElMessage.success('打印成功')
          }, 2000)
        })
      })
    }

    return {
      handlePrintHtml
    }
  }
}
</script>
