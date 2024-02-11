const error = {
    success: false,
    message: 'Something went wrong',
    data: {},
    error: {}
}

const success = {
    success: true,
    token: "",
    message: 'Successfully completed the request',
    data: {},
    error: {}
}

export {
    error as ErrorResponse,
    success as SuccessResponse
};

