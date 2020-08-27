import { qualificationRequest } from  '../api'

describe('api', () => {
  const data = {
    purchasePrice: 10000,
    autoMake: 'toyota',
    autoModel: 'camry',
    yearlyIncome: 60000,
    creditScore: 600,
  };

  it('should include \'qualified: true\' when price/income < 20% and credit score at least 600', async () => {
    const { qualified } = await qualificationRequest(data);
    expect(qualified).toBe(true);
  });

  it('should include \'qualified: false\' when carprice/income > 20%',  async () => {
    const { qualified } = await qualificationRequest({ ...data, yearlyIncome: 20000 });
    expect(qualified).toBe(false);
  });

  it('should include \'qualified: false\' when credit score < 600', async () => {
    const { qualified } = await qualificationRequest({ ...data, creditScore: 599 });
    expect(qualified).toBe(false);
  });

  it('should reject with bad request when car price over 1,000,000', async () => {
        try {
          await qualificationRequest({...data, purchasePrice: 1000001 })
        } catch(error) {
          expect(error.message).toBe('bad request');
        }
  });

});
