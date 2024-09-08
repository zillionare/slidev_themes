<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'

const props = defineProps({
    n: {//必须是奇数
        type: String,
        default: "3",
        required: false
    },
    imgwidth: {
        //必须是px单位
        type: String,
        default: "150px",
    },
    imgheight: {
        type: String,
        default: "150px"
    },
    w: {
        type: String,
        required: false
    },
    circle: {
        type: Boolean,
        default: true
    },
    slides: {
        type: Array,
        required: true
    },
    top: {
        // 容器
        type: String,
        required: false
    },
    left: {
        // 容器
        type: String,
        required: false
    }
})

const all_slides = computed(() => {
    return props.slides
})


const imgStyle = computed(() => {
    return {
        width: props.imgwidth,
        height: props.imgheight || props.imgwidth
    }
})

const style = computed(() => {
    return {
        top: props.top,
        left: props.left,
        width: props.w || '100%'
    }
})

function calcAndScale(target, cursor) {
    var scale = 1
    if (props.n < 5 && target == cursor) {
        scale = 1.2
    } else if (props.n > 5) {
        if (target == cursor) {
            scale = 1.5
        } else if (Math.abs(target - cursor) == 1) {
            scale = 1.2
        }
    }

    // console.info(`scale ${target} to ${scale}`)

    //query image and scale
    let img = document.getElementById(`carousel-${target}`)
    if (img == null)
        return

    if (scale == 1.2)
        // img.style.border = "3px solid rgba(200,200,200,0.8)"
        // img.style.boxShadow = "0 0 5px gold"
        img.style.animation = "glow 1.5s infinite alternate"
    else {
        // img.style.border = ""
        // img.style.boxShadow = ""
        img.style.animation = ""
    }
    // img.style.transform = `scale(${scale}) translateY(${(1-scale)*100}%)`
}
function set_nav(unit) {
    const slides = document.querySelectorAll(".slide");
    let total_slides = slides.length / 2

    // current slide counter
    // let curSlide = parseInt(props.n / 2)
    let curSlide = 1

    // loop through slides and set each slides translateX property to index * 100% 
    slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * unit}px)`;
        calcAndScale(indx, curSlide)
    });

    // select next slide button
    const nextSlide = document.querySelector(".btn-next");

    // add event listener and next slide functionality
    nextSlide.addEventListener("click", function () {
        if (curSlide === total_slides) {
            curSlide = 0
        } else {
            curSlide++;
        }

        console.info(`cur slide is ${curSlide}, ${total_slides - parseInt(props.n / 2)}`)

        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${(indx - curSlide + parseInt(props.n / 2)) * unit}px)`;
            calcAndScale(indx, curSlide)
        });
    });

    const prevSlide = document.querySelector(".btn-prev");

    // add event listener and next slide functionality
    prevSlide.addEventListener("click", function () {
        if (curSlide === 0) {
            curSlide = total_slides;
        } else {
            curSlide--;
        }

        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${(indx - curSlide + parseInt(props.n / 2)) * unit}px)`;
            calcAndScale(indx, curSlide, slides)
        });
    });
}

const hasCircle = computed(() => {
    if (props.circle)
        return "circle"
    else
        return ""
})

onMounted(() => {
    if ($renderContext.value !== 'slide')
        return

    // 计算每个slide的宽度
    if ($renderContext)
        var wrapper = document.querySelector(".carousel-wrapper")
    var unit = parseInt(wrapper.clientWidth) / props.n
    var slide_width = unit * 0.8

    var slide_height = 0
    document.querySelectorAll(".carousel .slide").forEach((item) => {
        item.style.width = `${slide_width}px`
        slide_height = Math.max(slide_height, item.clientHeight)
    })

    // 设置 carousel-wrapper的高度
    document.querySelector(".carousel-wrapper").style.height = `${slide_height * 2}px`
    set_nav(unit)
})
function p3text(text) {
    return (text.split("|")[2] || "").replaceAll("\n", "<br>")
}
</script>
<template>
    <div class="carousel-wrapper" :style="style">
        <div class="carousel">
            <div v-for="(item, index) in  all_slides " class="slide">
                <div class="img-wrapper">
                    <img v-if="item.img.startsWith('http')" :id="'carousel-' + index" :src="item.img" class="img"
                        :class="hasCircle" :style="imgStyle">
                    <div v-else class="circle padding-5" :style="imgStyle">
                        <AutoFitText>{{ item.img }}</AutoFitText>
                    </div>
                </div>
                <div class="img-desc">
                    <div class="p1"> {{ item.text.split("|")[0] || "" }}</div>
                    <div class="p2"> {{ item.text.split("|")[1] || "" }}</div>
                    <div class="p3" v-html="p3text(item.text)"> </div>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-next"></button>
    <button class="btn btn-prev"></button>
</template>
<style>
.carousel-wrapper {
    overflow: hidden;
    position: absolute;
    display: flex;
    align-items: center;
}

.carousel {
    position: relative;
    width: 100%;
    max-width: 800px;
    transition: all 1s;
}

.slide {
    transition: all 1s;
    position: absolute;
}

.circle {
    border-radius: 50%;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center
}

.circle:hover {
    transform: scale(1.1);
    box-shadow: 2px 3px 10px rgba(60, 60, 200, 0.5);
}

.btn {
    position: absolute;
    top: 0px;
    width: 200px;
    height: 200px;
    padding: 10px;
    border: none;
    border-radius: 50%;
    z-index: 10;
    cursor: pointer;
    background-color: grey;
    opacity: 0.025;
}

.btn:active {
    transform: scale(1.2);
}

.btn-prev {
    left: 2%;
}

.btn-next {
    right: 2%;
}

.img-desc {
    text-align: center;

    .p1 {
        color: #808080;
        font-size: 0.8em;
    }

    .p2 {
        color: darkorchid;
        margin: 0;
        padding: 0;
    }

    .p3 {
        font-size: 0.6em;
        color: #404040;
    }
}
</style>
