<template>


    <div class="logo">
        <div class="circle"></div>
        <div class="inner-wrapper">
            <div class="cn">
                <div class="liang">量</div>
                <div class="hua">化</div>
                <div class="feng">风</div>
                <div class="yuan">云</div>
            </div>
            <div class="en">QUANTIDE</div>
        </div>
    </div>

</template>

<style scoped>
.logo {
    height: 300px;

    .circle {
        position: relative;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 8px solid #f00000;
    }

    .inner-wrapper {
        background-color: #ffffff;
        position: relative;
        top: -225px;
        left: 50px;
        width: 350px;
        padding: 1em;
        color: #f00000;

        .cn {
            display: flex;
            align-items: center;
            font-size: 96px;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

            /* margin-bottom: 0.5em; */

            .liang,
            .hua,
            .feng,
            .yuan {
                margin: 0 5px;
                font-family: "aoyagireisyosimo2";
                line-height: 1em;
            }

            .feng {
                font-family: "PangMenZhengDao-Cu"
            }
        }

        .en {
            position: relative;
            left: 40%;
            display: inline-block;
            padding: 0 1em;
            font-size: 25px;

            &::before,
            &::after {
                content: ' ';
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 125px;
                border-bottom: 2px solid;
            }

            &::before {
                left: -115px;
            }

            &::after {
                right: -115px;
            }
        }
    }
}
</style>
