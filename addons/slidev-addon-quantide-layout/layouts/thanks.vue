<style>
    .thanks {
        background-image: url('/public/desktop.png');
        background-size: cover;
        /* background-blend-mode: lighten; */

        /* .mask{
            background: linear-gradient(to left, rgba(20, 20, 20, 0.5) 0%, rgba(60,60,60, 0) 50%, rgba(20,20,20, 0.5) 100%);

            :before {
                content: 'JIEYU.AI';
                position: absolute;
                left: 10px;;
                top: 8.44px;
                letter-spacing: 3px;
                color: transparent;
                background: url('/public/text-clip-4.png') 80% 50%  no-repeat;
                background-clip: text;
            }
        } */

        h1, h2 {
            color: transparent;
            background: url('/gold.jpg');
            background-clip: text;
        }

        h1 {
            font-size: 80px !important;
            line-height: 95.62px !important;
        }
         h1:after, h1:before, h2:before {
            content: unset !important;
        }

        .barcode {
            height: 150px;
            width:150px;
            background-image: url('/public/wechat_gzh.png');
            background-size: contain;
            background-repeat: no-repeat;
        }
    }

</style>
<template>
  <div class="slidev-layout thanks" style="padding:0">
    <!-- slotto -->
    <div class="flex flex-col h-full justify-center items-center mask">
        <!-- <h2>大富翁</h2>
        <h1>量化编程</h1> -->
        <!-- 二维码 -->
        <!-- <div class="barcode"/> -->
    </div>
  </div>
</template>
