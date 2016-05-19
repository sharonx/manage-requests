export interface IRequests {
    id?: number,
    requester: string,
    requestTime: string,
    repos: Array<Object>,
    verifyDetails: string,
    isEmergency: boolean
}