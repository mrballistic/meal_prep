const mockAxios = {
  create: jest.fn().mockReturnThis(),
  get: jest.fn().mockResolvedValue({ data: {} }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
  patch: jest.fn().mockResolvedValue({ data: {} }),
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn()
    },
    response: {
      use: jest.fn(),
      eject: jest.fn(),
      clear: jest.fn()
    }
  }
};

// Reset all mocks between tests
beforeEach(() => {
  Object.values(mockAxios).forEach(item => {
    if (jest.isMockFunction(item)) {
      item.mockClear();
    }
  });
  mockAxios.interceptors.request.use.mockClear();
  mockAxios.interceptors.request.eject.mockClear();
  mockAxios.interceptors.request.clear.mockClear();
  mockAxios.interceptors.response.use.mockClear();
  mockAxios.interceptors.response.eject.mockClear();
  mockAxios.interceptors.response.clear.mockClear();
});

export default mockAxios;
