<style scoped>
.poster {
    height: 100%;
    width: 100%;
    background: black;
}

.frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.jieyu.ai/images/hot/material/gold-patch.jpg');
}

.flip {
    background-image: url('https://images.jieyu.ai/images/hot/material/gold-top-flip.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    height: 100%;
    width: 100%;
}

.logo {
    position: absolute;
    left: 40px;
    top: 730px;
    background: linear-gradient(to right, #FCF6EE, #C8B28A);
    height: 78px;
    width: 80%;
    border-radius: 0 50px 50px 0;
}

.bottom-bar {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: #9585B2;
}
</style>

<template>
    <!-- <div class="frame">
        <div class="w-94% h-94% top-3% left-3% abs bg-white"></div>
        <div class="flip"></div>

    </div> -->
    <div class="logo"></div>
    <div class="bottom-bar"></div>
    <div class="abs top-700px z-10 w-300px h-200px">
        <svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,0 
             H580 
             C590,0 600,10 600,20
             V60
             C600,60 580,80 550,80
             S500,60 500,60
             L100,60
             C100,60 70,80 50,80
             S0,60 0,60
             V20
             C0,10 10,0 20,0
             Z" fill="#2E7D32" />
        </svg>
    </div>


</template>
