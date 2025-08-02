<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 128 128"
  >
    <symbol id="symbol-eiventures-pink" viewBox="0 0 128 128">
      <path
        fill="var(--eiv-pink)"
        opacity="0.75"
        d="M 21.952558,88.776539 C 28.532934,102.38743 50.65998,107.01048 60.232883,99.156593 95.350419,70.345143 106.04599,87.942742 119.78487,50.584865 126.33215,32.781896 116.24437,13.55039 77.513414,10.776438 36.806479,7.8609653 8.0691895,60.060081 21.952558,88.776539 Z"
      />
    </symbol>
    <symbol id="symbol-eiventures-cyan" viewBox="0 0 128 128">
      <path
        fill="var(--eiv-cyan)"
        opacity="0.75"
        d="M 46.693018,0.11673615 C 29.773986,1.2235939 -4.158092,8.9494881 2.418184,56.843037 4.7481604,73.811734 -8.4350118,92.597373 9.9463419,104.07642 30.211425,116.73184 41.783399,91.296085 44.082163,83.802646 53.250113,53.917249 90.084296,68.99144 85.777086,30.240505 83.097532,6.1332107 64.287015,-1.0342785 46.693018,0.11673615 Z"
      />
    </symbol>
    <symbol id="symbol-eiventures-purple" viewBox="0 0 128 128">
      <path
        fill="var(--eiv-purple)"
        opacity="0.75"
        d="m 50.200485,100.67898 c 7.709572,4.79429 14.35695,6.64976 21.75643,7.02221 C 83.438404,108.27911 91.350982,128 95.056158,128 c 2.590946,0 3.262919,-1.22227 3.0211,-3.67357 -3.714151,-37.649991 11.879702,-24.803623 22.161382,-33.801318 6.26049,-5.478672 11.5269,-20.636003 4.19442,-28.990005 -9.11209,-10.38154 4.39999,-23.993588 -9.28479,-31.04312 C 76.311518,10.485763 17.713762,80.476741 50.200485,100.67898 Z"
      />
    </symbol>
    <symbol id="symbol-eiventures-icon" viewBox="0 0 128 128">
      <use xlink:href="#symbol-eiventures-pink" />
      <use xlink:href="#symbol-eiventures-cyan" />
      <use xlink:href="#symbol-eiventures-purple" />
    </symbol>

    <use xlink:href="#symbol-eiventures-pink">
      <animateTransform
        v-if="animated"
        attributeName="transform"
        type="scale"
        additive="sum"
        calcMode="spline"
        values="1 1; 1.05 1.05; 1 1"
        keySplines=".5 0 .5 1; .5 0 .5 1"
        keyTimes="0; .5; 1"
        begin="0s"
        :dur="animationDuration"
        repeatCount="indefinite"
      />
    </use>
    <use xlink:href="#symbol-eiventures-cyan">
      <animate
        v-if="animated"
        attributeName="opacity"
        values="0.8; 1; 0.8"
        begin="1.25s"
        :dur="animationDuration"
        repeatCount="indefinite"
      />
      <animateTransform
        v-if="animated"
        attributeName="transform"
        type="scale"
        additive="sum"
        calcMode="spline"
        values="1 1; 1.05 1.05; 1 1"
        keySplines=".5 0 .5 1; .5 0 .5 1"
        keyTimes="0; .5; 1"
        begin="1s"
        :dur="animationDuration"
        repeatCount="indefinite"
      />
    </use>
    <use xlink:href="#symbol-eiventures-purple">
      <animate
        v-if="animated"
        attributeName="opacity"
        values="0.8; 1; 0.8"
        begin="1.5s"
        :dur="animationDuration"
        repeatCount="indefinite"
      />
      <animateTransform
        v-if="animated"
        attributeName="transform"
        type="scale"
        additive="sum"
        calcMode="spline"
        values="1 1; 1.05 1.05; 1 1"
        keySplines=".5 0 .5 1; .5 0 .5 1"
        keyTimes="0; .5; 1"
        begin="2s"
        :dur="animationDuration"
        repeatCount="indefinite"
      />
    </use>
  </svg>
</template>

<script setup>
defineProps({
  animated: Boolean,
  animationDuration: { type: String, default: "3s" },
});
</script>
