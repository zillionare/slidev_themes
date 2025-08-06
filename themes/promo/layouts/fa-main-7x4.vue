<style scoped>
.poster {
    width: 1000px;
    height: 1000px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 215, 0, 0.3);
}

.bg-img {
    background: url('https://images.jieyu.ai/images/2025/03/lightgbm-vs-boost.png'), linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1));
    background-size: 60% auto;
    background-position: 40% -10%, center center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 0.1;
    position: absolute;
}


.brand {
    position: static;
    transform: none;
    margin-top: 20px;
    font-size: 28px;
    color: white;
    text-align: center;
    width: auto;
}


.yinyang {
    width: 200px;
    height: 300px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.box {
    position: relative;
    top: auto;
    left: auto;
    width: 100px;
    height: 100px;
    transform: rotate(45deg);
    transform-origin: center;
}

.feature {
    /* background: linear-gradient(to bottom, rgba(255, 214, 0, 0.8), rgba(255, 255, 255, 1), rgba(255, 214, 0, 0.8)); */
    padding: 0;
    margin-bottom: 10px;
    color: black;
}
</style>

<template>
    <div class="poster">
        <div class="bg-img">
        </div>
        <div class="abs left-50%">
            <svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="-25 -25 250 250" class="float">
                <defs>
                    <linearGradient id="lgrad" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style="stop-color:#ff40ff;stop-opacity:0" />
                        <stop offset="100%" style="stop-color:#008EE6;stop-opacity:0.2" />
                    </linearGradient>
                    <clipPath id="teacher">
                        <path
                            d="M130.34026213039402 4.713754959810814 C90.67510714576812 -4.110328947845645 8.04966631886587 62.01412090338509 0.01706034601409101 101.84709992891945 C-4.841154034087297 125.9385532079883 29.304170869381736 173.1568205935747 49.91016018527592 186.5506091679041 C66.63513136317088 197.42175563092252 110.37592783885619 202.3040489123338 129.18022829866456 195.64786603180343 C151.71838192861352 187.67000625068192 192.79388261667387 151.0682579206122 196.17302675919336 127.39979788201879 C201.0927098713082 92.9409768816179 164.3178731185513 12.27256294776446 130.34026213039402 4.713754959810814Z" />
                    </clipPath>
                </defs>
                <path
                    d="M130.34026213039402 4.713754959810814 C90.67510714576812 -4.110328947845645 8.04966631886587 62.01412090338509 0.01706034601409101 101.84709992891945 C-4.841154034087297 125.9385532079883 29.304170869381736 173.1568205935747 49.91016018527592 186.5506091679041 C66.63513136317088 197.42175563092252 110.37592783885619 202.3040489123338 129.18022829866456 195.64786603180343 C151.71838192861352 187.67000625068192 192.79388261667387 151.0682579206122 196.17302675919336 127.39979788201879 C201.0927098713082 92.9409768816179 164.3178731185513 12.27256294776446 130.34026213039402 4.713754959810814Z"
                    stroke="none" fill="url(#lgrad)" />

                <image href="https://images.jieyu.ai/images/hot/me-2025-2-7.jpg" x="0" y="-35" width="250" height="250"
                    clip-path="url(#teacher)" />
            </svg>
        </div>
        <div class="abs left--10% top--30%">
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="25 -25 250 250">
                <defs>
                    <linearGradient id="lgrad1" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#c0c0c0;stop-opacity:1.00" />
                        <stop offset="100%" style="stop-color:#ffd700;stop-opacity:1.00" />
                    </linearGradient>
                </defs>
                <path
                    d="M199.84925711678864 94.51129767381791 C164.45656226335183 59.74220696214429 11.395790934127358 80.75724242578264 4.5746704372280504 129.89994110088452 C-0.4138492636115796 165.8396845205488 99.11650181076803 199.47474649530412 134.9380163924355 193.69810569356196 C154.97502897764332 190.46690160304678 183.5944773158959 154.9134371899647 192.94334963420363 136.89896690659754 C197.88895799774585 127.36920632534165 207.5083814934593 102.0354715556661 199.84925711678864 94.51129767381791Z"
                    stroke="none" fill="url(#lgrad1)" />
            </svg>
        </div>
        <div class="abs left-20% top--20%">
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 -25 250 250">
                <defs>
                    <linearGradient id="lgrad2" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style="stop-color:#ff40ff;stop-opacity:0.5" />
                        <stop offset="100%" style="stop-color:#ffd700;stop-opacity:0.2" />
                    </linearGradient>
                </defs>
                <path
                    d="M198.15108560707603 80.85935230582744 C194.81556516981425 44.6363882468529 107.07970101159864 -14.274613946185003 75.14223495740555 3.138802830611425 C32.72062868512819 26.26853732823416 29.222383951252915 176.8623438757311 73.41312099826679 196.40092253161896 C112.28958627485758 213.58983870338233 202.04876205633113 123.18719786709835 198.15108560707603 80.85935230582744Z"
                    stroke="none" fill="url(#lgrad2)" />
            </svg>
        </div>
        <div class="w-full h-300px mt-30px">
            <div class="abs flex w-300px left-320px">
                <!-- <div class="box bg-white left-50px"></div> -->
                <div class="box bg-#ffd700"></div>
                <div class="box bg-black"></div>
            </div>
            <div class="abs flex mt-25px left-360px text-white w-300px text-3xl text-center">
                匡
                醍
                好
                课
            </div>
        </div>


        <div class="abs instructor" />

        <div class="abs top-20% ml--70px text-center text-6xl  w-full text-shadow-[1px_4px_4px_rgba(0,0,0,0.5)]"
            style="font-family: 'PangMenChuShuTi'">
            基本面策略构建
        </div>

        <div class="abs top-28% ml--70px text-center text-3xl  w-full text-shadow-[1px_4px_4px_rgba(0,0,0,0.5)]"
            style="font-family: 'PangMenChuShuTi', serif;">
            从入门到精通
        </div>

        <div class="abs text-8xl  top-18% left-5% text-yellow-600">01</div>

        <div class="abs text-1xl top-35% left--70px w-full flex flex-row justify-center space-x-8 opacity-50">
            <!-- 左列 -->
            <div class="w-50% text-right space-y-4 pr-8 relative">
                <div class="feature text-shadow">21节课 400+因子</div>
                <div class="feature text-shadow">Alphalens 从入门到精通</div>
                <div class="feature text-shadow">深入机器学习构建量化策略</div>

                <!-- 竖线 -->
                <div class="absolute right-0 top-0 h-full w-px bg-black translate-y--20px">
                </div>
            </div>

            <!-- 右列 -->
            <div class="w-50% text-left space-y-4">
                <div class="feature text-shadow">基于 LightGBM 的价格预测模型</div>
                <div class="feature text-shadow">基于 LightGBM 的形态预测模型</div>
                <div class="feature text-shadow">基于 HDBSCAN 的 Pair Trading策略</div>
            </div>
        </div>
        <slot />
    </div>

</template>
