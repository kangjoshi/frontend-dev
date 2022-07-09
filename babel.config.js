module.exports = {
    presets: [
        //'./my-babel-preset.js'
        ['@babel/preset-env', {
            /*
            *  - 지원 해야 하는 브라우저 지정
            *  - 지정하지 않을 경우 모든 ES2015-ES2020 코드를 ES5로 변환 (오래된 브라우저 지원 가능하도록)
            *  - 용량 최적화를 위해 명시 하는것을 바벨에서 권장
            * */
            targets: {
                chrome: '79',
                ie: '11'
            },
            /*
            * - 폴리필 설정
            * - usage: 실제 사용한 폴리필만 삽입
            * - entry: core-js, regenerator-runtime 모듈을 전역 스코프에 삽입한 경우, 해당 삽입 문을 타킷 환경에 필요한 하위 모듈들의 삽입문으로 변경
            * - false: 기본 값, 폴리필 사용 안 함
            * */
            useBuiltIns: 'usage',
            corejs: {
                version: 2
            }
        }]
    ]
}