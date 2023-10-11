<template>
    <div class="decoration">
        <!-- w 614  w/ 193 h/ 150 -->
        <svg width="1000" height="300" viewBox="0 0 1000 300" version="1.1">
            <!-- 2个三角 -->
            <filter id="outShadow2">
                <feFlood result="flood" flood-color="#41d0fb" flood-opacity="1"></feFlood>
                <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                <feMorphology in="mask" result="dilated" operator="dilate" radius="1"></feMorphology>
                <feGaussianBlur in="dilated" result="blurred" stdDeviation="4"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blurred"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <polygon points="190,146 810,146 810,154 190,154" fill="rgba(13,148,203,0.5)" />
            <polygon points="281,149 767,149 767,151 281,151" fill="#c6edf8" />
            <g filter="url(#outShadow2)">
                <polyline points="193,141 229,141 229,159 193,159 193,140.5" fill="transparent" stroke="#fff"
                    stroke-width="1" />
                <polygon points="209,149 215,149 215,151 209,151" fill="#fff" />

                <polyline points="229,134 234,134 234,166 229,166" fill="transparent" stroke="#fff" stroke-width="1" />
                <polyline points="246,135 239,135 239,165 246,165" fill="transparent" stroke="#fff" stroke-width="1" />

                <polyline points="245,141 281,141 281,159 245,159 245,140.5" fill="transparent" stroke="#fff"
                    stroke-width="1" />
                <polygon points="261,149 267,149 267,151 261,151" fill="#fff" />

                <polyline points="766,141 802,141 802,159 766,159 766,140.5" fill="transparent" stroke="#fff"
                    stroke-width="1" />
                <polygon points="782,149 788,149 788,151 782,151" fill="#fff" />

                <polyline points="803,134 808,134 808,166 803,166" fill="transparent" stroke="#fff" stroke-width="1" />
                <polygon points="563,149 579,149 579,151 563,151" fill="#fff" />

                <polygon points="667,149 673,149 673,151 667,151" fill="#fff" />
            </g>
        </svg>
        <div class="piece"></div>
    </div>
</template>

<script>
export default {
    name: "Decoration",
}
</script>

<style lang="scss" scoped>
.decoration {
    position: absolute;
    width: 1000px;
    height: 300px;

    .piece {
        position: absolute;
        left: 280px;
        top: 147px;
        width: 50px;
        height: 6px;
        background-image: linear-gradient(0, rgba(26, 143, 255, .9), rgba(26, 143, 255, .9), rgba(255, 255, 255, .9), rgba(26, 143, 255, .9), rgba(26, 143, 255, .9));
        box-shadow: -150px 0 300px 90px rgba(26, 143, 255, .2),
            150px 0 300px 90px rgba(26, 143, 255, .2),
            0 0 300px 90px rgba(26, 143, 255, .2);
        border-radius: 50%;
        animation: anima 8000ms ease infinite;

        @keyframes anima {
            0% {
                transform: matrix(1, 0, 0, 1, 0, 0);
            }

            50% {
                transform: matrix(1, 0, 0, 1, 440, 0);
            }

            100% {
                transform: matrix(1, 0, 0, 1, 0, 0);
            }
        }
    }
}
</style>