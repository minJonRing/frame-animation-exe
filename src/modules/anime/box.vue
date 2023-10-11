<template>
    <div class="box" :style="{ height: height + 'px' }">
        <div class="audio">
            <template v-for="i in 30" :key="i">
                <div :class="['a', `a${i}`]" />
            </template>
        </div>
        <div class="audio audio-2">
            <template v-for="i in 30" :key="i">
                <div :class="['a', `a${i}`]" />
            </template>
        </div>
        <svg width="652" :height="height" :viewBox="`0 0 652 ${height}`" version="1.1">
            <!-- 最外边对称装饰 -->
            <filter id="outShadow">
                <feFlood result="flood" flood-color="#41d0fb" flood-opacity="1"></feFlood>
                <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                <feMorphology in="mask" result="dilated" operator="dilate" radius="0.1"></feMorphology>
                <feGaussianBlur in="dilated" result="blurred" stdDeviation="3"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blurred"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <g filter="url(#outShadow)">
                <circle cx="36" cy="145" r="2" stroke="#41d0fb" stroke-width="1" fill="transparent" />
                <polyline points="36,143 36,56 56,41 175,40" fill="transparent" stroke="#41d0fb" stroke-width="1" />
                <circle cx="177" cy="40" r="2" stroke="#41d0fb" stroke-width="1" fill="transparent" />
                <polyline points="36,60 36,56 56,41 61,41" fill="#41d0fb" />
            </g>
            <g filter="url(#outShadow)" style="transform-origin: center center;transform: matrix(-1,0,0,-1,8,7);">
                <circle cx="36" cy="145" r="2" stroke="#41d0fb" stroke-width="1" fill="transparent" />
                <polyline points="36,143 36,56 56,41 175,40" fill="transparent" stroke="#41d0fb" stroke-width="1" />
                <circle cx="177" cy="40" r="2" stroke="#41d0fb" stroke-width="1" fill="transparent" />
                <polyline points="36,60 36,56 56,41 61,41" fill="#41d0fb" />
            </g>
            <!-- 外边框 -->
            <polyline :points="`60,53 600,53 600,${height - 47} 60,${height - 47} 60,53`" fill="transparent"
                stroke="#41d0fb" stroke-width="1" filter="url(#outShadow)" />
            <!-- 2个三角 -->
            <filter id="outShadow1">
                <feFlood result="flood" flood-color="#41d0fb" flood-opacity="1"></feFlood>
                <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                <feMorphology in="mask" result="dilated" operator="dilate" radius="0.5"></feMorphology>
                <feGaussianBlur in="dilated" result="blurred" stdDeviation="1"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blurred"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
            <polyline points="56,50 64,50 56,58" fill="#41d0fb" filter="url(#outShadow1)" />
            <polyline :points="`604,${height - 44} 596,${height - 44} 604,${height - 52}`" fill="#41d0fb"
                filter="url(#outShadow1)" />
            <!-- 边框装饰 -->
            <g>
                <polyline points="462,52 604,52 604,169 594,159 594,58 472,58" fill="#5dc6f1" />
                <polyline points="604,174 604,185 594,174 594,163" fill="#41d0fb" />
            </g>
            <g style="transform-origin: center center;transform: matrix(-1,0,0,-1,8,7);">
                <polyline points="462,52 604,52 604,169 594,159 594,58 472,58" fill="#5dc6f1" />
                <polyline points="604,174 604,185 594,174 594,163" fill="#41d0fb" />
            </g>
            <!-- 虚线边框 -->
            <defs>
                <linearGradient id="linear" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#fff" :stop-opacity="0" />
                    <stop offset="100%" style="stop-color:#fff" :stop-opacity="0.05" />
                </linearGradient>
            </defs>
            <polyline class="dashed" :points="`72,63 588,63 588,${height - 57} 72,${height - 57} 72,63`" fill="url(#linear)"
                stroke="#41d0fb" stroke-width="1" filter="url(#outShadow)" stroke-dasharray="9 11" stroke-dashoffset="0" />
            <!-- 内部线框490 423 73 350 260 -->
            <polyline :points="`80,73 580,73 580,${height - 67} 80,${height - 67} 80,73`" fill="url(#linear)"
                stroke="#41d0fb" stroke-width="1" filter="url(#outShadow)"
                :stroke-dasharray="`60 70 240 70 60 0 40 70 ${height - 360} 70 40 0 60 70 240 70 60 0 40 70 ${height - 360} 70 40`" />
        </svg>
    </div>
</template>

<script>
export default {
    name: "Box",
    props: {
        height: {
            type: Number,
            default: 490
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    position: absolute;
    width: 652px;

    .audio {
        position: absolute;
        top: 32px;
        left: 182px;
        display: flex;

        &.audio-2 {
            transform-origin: center center;
            transform: rotate(90deg);
            top: auto;
            left: auto;
            bottom: 196px;
            right: -32px;
        }

        .a {
            // display: inline-block;
            // vertical-align: middle;
            width: 2px;
            height: 16px;
            background-color: #36faff;
            margin: 0 1px;
            transform: matrix(1, 0, 0, 1, 0, 0);
            animation: scale 300ms linear infinite;

            @keyframes scale {
                0% {
                    transform: matrix(1, 0, 0, 1, 0, 0);
                }

                50% {
                    transform: matrix(1, 0, 0, 0.2, 0, 0);
                }

                100% {
                    transform: matrix(1, 0, 0, 1, 0, 0);
                }
            }


            &.a2 {
                animation-delay: 90ms;
            }

            &.a3 {
                animation-delay: 60ms;
            }

            &.a4 {
                animation-delay: 270ms;
            }

            &.a5 {
                animation-delay: 150ms;
            }

            &.a6 {
                animation-delay: 30ms;
            }

            &.a7 {
                animation-delay: 120ms;
            }

            &.a8 {
                animation-delay: 240ms;
            }

            &.a9 {
                animation-delay: 180ms;
            }

            &.a10 {
                animation-delay: 300ms;
            }

            &.a12 {
                animation-delay: 120ms;
            }

            &.a13 {
                animation-delay: 30ms;
            }

            &.a14 {
                animation-delay: 210ms;
            }

            &.a15 {
                animation-delay: 300ms;
            }

            &.a16 {
                animation-delay: 90ms;
            }

            &.a17 {
                animation-delay: 180ms;
            }

            &.a18 {
                animation-delay: 60ms;
            }

            &.a19 {
                animation-delay: 240ms;
            }

            &.a20 {
                animation-delay: 270ms;
            }

            &.a22 {
                animation-delay: 120ms;
            }

            &.a23 {
                animation-delay: 300ms;
            }

            &.a24 {
                animation-delay: 60ms;
            }

            &.a35 {
                animation-delay: 180ms;
            }

            &.a26 {
                animation-delay: 270ms;
            }

            &.a27 {
                animation-delay: 210ms;
            }

            &.a28 {
                animation-delay: 30ms;
            }

            &.a29 {
                animation-delay: 90ms;
            }

            &.a30 {
                animation-delay: 240ms;
            }
        }
    }

    .dashed {
        animation: animaDashed 300ms linear infinite;

        @keyframes animaDashed {
            0% {
                stroke-dashoffset: 0
            }

            0% {
                stroke-dashoffset: 20
            }
        }
    }
}
</style>