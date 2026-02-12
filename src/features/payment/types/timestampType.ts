/** 조회시점 기준
 * @CREATED_AT 결제 건 생성 시점을 기준
 * @STATUS_CHANGED_AT  상태 승인 시점을 기준
 */
export enum ETimeStampType {
  CREATED_AT = 'CREATED_AT',
  STATUS_CHANGED_AT = 'STATUS_CHANGED_AT'
}
