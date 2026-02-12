/* TODO 실제 api 연동 dev일 땐 'DEVELOPMENT'로, prod 땐 반드시 'RPODUCTION' 으로 바꿀 것 */
/** dummy 모드 여부확인 */
export const isDummy = import.meta.env.VITE_TYPE === 'RPODUCTION';
