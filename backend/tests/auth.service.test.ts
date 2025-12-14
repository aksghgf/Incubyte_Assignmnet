import { AuthService } from '../src/services/auth.service';
import { userRepository } from '../src/repositories/user.repository';
import { hashPassword, comparePassword } from '../src/utils/password.util';
import { generateToken } from '../src/utils/jwt.util';

// Mock dependencies
jest.mock('../src/repositories/user.repository');
jest.mock('../src/utils/password.util');
jest.mock('../src/utils/jwt.util');

describe('AuthService', () => {
    let authService: AuthService;
    const mockUserRepository = userRepository as jest.Mocked<typeof userRepository>;
    const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>;
    const mockComparePassword = comparePassword as jest.MockedFunction<typeof comparePassword>;
    const mockGenerateToken = generateToken as jest.MockedFunction<typeof generateToken>;

    beforeEach(() => {
        authService = new AuthService();
        jest.clearAllMocks();
    });

    describe('register', () => {
        const registerData = {
            email: 'test@example.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
        };

        it('should successfully register a new user', async () => {
            // Arrange
            mockUserRepository.findByEmail.mockResolvedValue(null);
            mockHashPassword.mockResolvedValue('hashedPassword');
            mockUserRepository.create.mockResolvedValue({
                id: '1',
                email: registerData.email,
                password: 'hashedPassword',
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            mockGenerateToken.mockReturnValue('mock-jwt-token');

            // Act
            const result = await authService.register(registerData);

            // Assert
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(registerData.email);
            expect(mockHashPassword).toHaveBeenCalledWith(registerData.password);
            expect(mockUserRepository.create).toHaveBeenCalled();
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('token', 'mock-jwt-token');
            expect(result.user.email).toBe(registerData.email);
        });

        it('should throw error if user already exists', async () => {
            // Arrange
            mockUserRepository.findByEmail.mockResolvedValue({
                id: '1',
                email: registerData.email,
                password: 'hashedPassword',
                firstName: 'John',
                lastName: 'Doe',
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Act & Assert
            await expect(authService.register(registerData)).rejects.toThrow('User with this email already exists');
            expect(mockHashPassword).not.toHaveBeenCalled();
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('login', () => {
        const loginCredentials = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockUser = {
            id: '1',
            email: loginCredentials.email,
            password: 'hashedPassword',
            firstName: 'John',
            lastName: 'Doe',
            role: 'USER' as const,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        it('should successfully login with valid credentials', async () => {
            // Arrange
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockComparePassword.mockResolvedValue(true);
            mockGenerateToken.mockReturnValue('mock-jwt-token');

            // Act
            const result = await authService.login(loginCredentials);

            // Assert
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginCredentials.email);
            expect(mockComparePassword).toHaveBeenCalledWith(loginCredentials.password, mockUser.password);
            expect(result).toHaveProperty('user');
            expect(result).toHaveProperty('token', 'mock-jwt-token');
            expect(result.user.email).toBe(loginCredentials.email);
        });

        it('should throw error if user not found', async () => {
            // Arrange
            mockUserRepository.findByEmail.mockResolvedValue(null);

            // Act & Assert
            await expect(authService.login(loginCredentials)).rejects.toThrow('Invalid email or password');
            expect(mockComparePassword).not.toHaveBeenCalled();
        });

        it('should throw error if password is invalid', async () => {
            // Arrange
            mockUserRepository.findByEmail.mockResolvedValue(mockUser);
            mockComparePassword.mockResolvedValue(false);

            // Act & Assert
            await expect(authService.login(loginCredentials)).rejects.toThrow('Invalid email or password');
            expect(mockGenerateToken).not.toHaveBeenCalled();
        });
    });

    describe('verifyUser', () => {
        it('should return true if user exists', async () => {
            // Arrange
            mockUserRepository.findById.mockResolvedValue({
                id: '1',
                email: 'test@example.com',
                password: 'hashedPassword',
                firstName: 'John',
                lastName: 'Doe',
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            // Act
            const result = await authService.verifyUser('1');

            // Assert
            expect(result).toBe(true);
            expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
        });

        it('should return false if user does not exist', async () => {
            // Arrange
            mockUserRepository.findById.mockResolvedValue(null);

            // Act
            const result = await authService.verifyUser('999');

            // Assert
            expect(result).toBe(false);
        });
    });
});
