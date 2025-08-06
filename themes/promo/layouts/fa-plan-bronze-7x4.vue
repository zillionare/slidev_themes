<script setup>
import { computed } from 'vue'


console.log("fronmatter.color", $frontmatter.color)
const styleVars = computed(() => {
    var colors = $frontmatter.color.split(",")
    console.log("colors", colors)
    return {
        '--title-color': colors[0],
        '--row-icon-color': colors[1],
        '--feature-item-border-color': colors[2],
        '--feature-item-color': colors[3]
    }
})
</script>
<style scoped>
.poster {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-image: url('https://images.jieyu.ai/images/2025/03/lightgbm-vs-boost.png');
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: 110% 95%;
}

.header-container {
    position: relative;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    padding-top: 2.5em;
}

.content {
    padding: 30px;
    display: flex;
    justify-content: space-between;
}

.left-content {
    flex: 1;
}

.title {
    color: var(--title-color);
    font-size: 48px;
    font-weight: bold;
    margin: 1em 0;
    width: 100%;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.features {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.feature-row {
    display: flex;
    align-items: center;
}

.feature-row-icon {
    width: 30px;
    height: 30px;
    background-color: var(--row-icon-color);
    border-radius: 50%;
    color: white;
    font-size: 1.2em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
}

.feature-item {
    border: 2px solid var(--feature-item-border-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    color: var(--feature-item-color);
    padding: 5px 10px;
    border-radius: 25px;
    font-size: 14px;
    margin-left: 15px;
}

.right-banner-bg {
    background: linear-gradient(150deg, var(--title-color) 0%, var(--feature-item-color) 100%);
    position: absolute;
    width: 400px;
    height: 250px;
    left: 0px;
    top: 0;
    transform-origin: bottom right;
    clip-path: polygon(0 0, 100% 0%, 0% 100%);
    z-index: -1;
}
</style>
<template>
    <div class="poster" :style="styleVars">
        <div class="content">
            <div class="left-content">
                <div class="title">{{ $frontmatter.title }}</div>

                <div class="features w-80% mt-100px ml-20px">
                    <div class="feature-row">
                        <div class="feature-row-icon">1</div>
                        <div class="feature-item" v-html="$frontmatter.feature1"></div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">2</div>
                        <div class="feature-item" v-html="$frontmatter.feature2"></div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">3</div>
                        <div class="feature-item" v-html="$frontmatter.feature3"></div>
                    </div>
                    <div class="feature-row">
                        <div class="feature-row-icon">4</div>
                        <div class="feature-item" v-html="$frontmatter.feature4"></div>
                    </div>

                </div>

                <div class="right-banner-bg">
                    <div class="abs bottom-60px ml-10px flex flex-col color-white">
                        <div class="mt--30 text-7xl underline transform-rotate--33">{{ $frontmatter.price }}</div>
                    </div>
                    <div class="abs top-0.5rem text-1xl pl-10px z--1" v-html="$frontmatter.declaration">

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
