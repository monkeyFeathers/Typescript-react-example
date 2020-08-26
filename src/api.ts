export interface QualificationData {
    purchasePrice: number;
    autoMake: string;
    autoModel: string;
    yearlyIncome: number;
    creditScore: number;
}

type HTTPResponseSuccess = {
    code: number;
    qualified: boolean;
    message?: string;
}

type HTTPResponseError = {
    code: number;
    message: string;
}

type HTTPResponse = HTTPResponseSuccess | HTTPResponseError

const disqualificationMessage = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

export function qualificationRequest(data: QualificationData): Promise<HTTPResponse> {
    const { purchasePrice, yearlyIncome, creditScore } = data;
    if (purchasePrice > 1000000 ) return Promise.reject({ code: 400, message: 'bad request' });
    if (purchasePrice / yearlyIncome > 0.2 || creditScore < 600 ) return Promise.resolve({code: 200, qualified: false, message: disqualificationMessage })
    return Promise.resolve({ code: 200, qualified: true})
}
