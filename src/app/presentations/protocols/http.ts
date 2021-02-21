export interface HttpResponse {
	statusCode: number
	body: any
}

export interface HttpRequest {
	args: any
	headers?: any
}
