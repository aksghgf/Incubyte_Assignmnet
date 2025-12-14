import { SweetsService } from '../src/services/sweets.service';
import { sweetRepository } from '../src/repositories/sweet.repository';

// Mock dependencies
jest.mock('../src/repositories/sweet.repository');

describe('SweetsService', () => {
    let sweetsService: SweetsService;
    const mockSweetRepository = sweetRepository as jest.Mocked<typeof sweetRepository>;

    beforeEach(() => {
        sweetsService = new SweetsService();
        jest.clearAllMocks();
    });

    const mockSweet = {
        id: '1',
        name: 'Gulab Jamun',
        category: 'INDIAN',
        description: 'Traditional Indian sweet',
        price: 50,
        quantity: 100,
        imageUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe('create', () => {
        const createData = {
            name: 'Gulab Jamun',
            category: 'INDIAN',
            description: 'Traditional Indian sweet',
            price: 50,
            quantity: 100,
            imageUrl: 'https://example.com/image.jpg',
        };

        it('should successfully create a new sweet', async () => {
            // Arrange
            mockSweetRepository.create.mockResolvedValue(mockSweet);

            // Act
            const result = await sweetsService.create(createData);

            // Assert
            expect(mockSweetRepository.create).toHaveBeenCalledWith(createData);
            expect(result).toEqual(mockSweet);
        });

        it('should throw error if price is negative', async () => {
            // Arrange
            const invalidData = { ...createData, price: -10 };

            // Act & Assert
            await expect(sweetsService.create(invalidData)).rejects.toThrow();
        });
    });

    describe('getAll', () => {
        it('should return all sweets', async () => {
            // Arrange
            const mockSweets = [mockSweet, { ...mockSweet, id: '2', name: 'Jalebi' }];
            mockSweetRepository.findAll.mockResolvedValue(mockSweets);

            // Act
            const result = await sweetsService.getAll();

            // Assert
            expect(mockSweetRepository.findAll).toHaveBeenCalled();
            expect(result).toEqual(mockSweets);
            expect(result).toHaveLength(2);
        });

        it('should return empty array when no sweets exist', async () => {
            // Arrange
            mockSweetRepository.findAll.mockResolvedValue([]);

            // Act
            const result = await sweetsService.getAll();

            // Assert
            expect(result).toEqual([]);
        });
    });

    describe('getById', () => {
        it('should return a sweet when found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);

            // Act
            const result = await sweetsService.getById('1');

            // Assert
            expect(mockSweetRepository.findById).toHaveBeenCalledWith('1');
            expect(result).toEqual(mockSweet);
        });

        it('should throw error when sweet not found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(sweetsService.getById('999')).rejects.toThrow('Sweet not found');
        });
    });

    describe('update', () => {
        const updateData = {
            name: 'Updated Gulab Jamun',
            price: 60,
        };

        it('should successfully update a sweet', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);
            mockSweetRepository.update.mockResolvedValue({ ...mockSweet, ...updateData });

            // Act
            const result = await sweetsService.update('1', updateData);

            // Assert
            expect(mockSweetRepository.findById).toHaveBeenCalledWith('1');
            expect(mockSweetRepository.update).toHaveBeenCalledWith('1', updateData);
            expect(result.name).toBe(updateData.name);
            expect(result.price).toBe(updateData.price);
        });

        it('should throw error if sweet not found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(sweetsService.update('999', updateData)).rejects.toThrow('Sweet not found');
            expect(mockSweetRepository.update).not.toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should successfully delete a sweet', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);
            mockSweetRepository.delete.mockResolvedValue(null as any);

            // Act
            await sweetsService.delete('1');

            // Assert
            expect(mockSweetRepository.findById).toHaveBeenCalledWith('1');
            expect(mockSweetRepository.delete).toHaveBeenCalledWith('1');
        });

        it('should throw error if sweet not found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(sweetsService.delete('999')).rejects.toThrow('Sweet not found');
            expect(mockSweetRepository.delete).not.toHaveBeenCalled();
        });
    });

    describe('purchase', () => {
        it('should successfully purchase a sweet', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);
            mockSweetRepository.updateQuantity.mockResolvedValue({ ...mockSweet, quantity: 95 });

            // Act
            const result = await sweetsService.purchase('1', { quantity: 5 });

            // Assert
            expect(mockSweetRepository.findById).toHaveBeenCalledWith('1');
            expect(mockSweetRepository.updateQuantity).toHaveBeenCalledWith('1', 95);
            expect(result.quantity).toBe(95);
        });

        it('should throw error if sweet not found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(sweetsService.purchase('999', { quantity: 5 })).rejects.toThrow('Sweet not found');
        });

        it('should throw error if insufficient quantity', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue({ ...mockSweet, quantity: 3 });

            // Act & Assert
            await expect(sweetsService.purchase('1', { quantity: 5 })).rejects.toThrow('Insufficient');
            expect(mockSweetRepository.updateQuantity).not.toHaveBeenCalled();
        });

        it('should throw error if purchase quantity is zero or negative', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);

            // Act & Assert
            await expect(sweetsService.purchase('1', { quantity: 0 })).rejects.toThrow();
            await expect(sweetsService.purchase('1', { quantity: -5 })).rejects.toThrow();
        });
    });

    describe('restock', () => {
        it('should successfully restock a sweet', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);
            mockSweetRepository.updateQuantity.mockResolvedValue({ ...mockSweet, quantity: 150 });

            // Act
            const result = await sweetsService.restock('1', { quantity: 50 });

            // Assert
            expect(mockSweetRepository.findById).toHaveBeenCalledWith('1');
            expect(mockSweetRepository.updateQuantity).toHaveBeenCalledWith('1', 150);
            expect(result.quantity).toBe(150);
        });

        it('should throw error if sweet not found', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(sweetsService.restock('999', { quantity: 50 })).rejects.toThrow('Sweet not found');
        });

        it('should throw error if restock quantity is zero or negative', async () => {
            // Arrange
            mockSweetRepository.findById.mockResolvedValue(mockSweet);

            // Act & Assert
            await expect(sweetsService.restock('1', { quantity: 0 })).rejects.toThrow();
            await expect(sweetsService.restock('1', { quantity: -10 })).rejects.toThrow();
        });
    });

    describe('search', () => {
        const mockSweets = [
            mockSweet,
            { ...mockSweet, id: '2', name: 'Jalebi', price: 30 },
            { ...mockSweet, id: '3', name: 'Rasgulla', category: 'TRADITIONAL', price: 40 },
        ];

        it('should search by name', async () => {
            // Arrange
            mockSweetRepository.search.mockResolvedValue([mockSweet]);

            // Act
            const result = await sweetsService.search({ search: 'Gulab' });

            // Assert
            expect(mockSweetRepository.search).toHaveBeenCalledWith({ search: 'Gulab' });
            expect(result).toHaveLength(1);
            expect(result[0].name).toContain('Gulab');
        });

        it('should search by category', async () => {
            // Arrange
            mockSweetRepository.search.mockResolvedValue([mockSweet, mockSweets[1]]);

            // Act
            const result = await sweetsService.search({ category: 'INDIAN' });

            // Assert
            expect(result.every(s => s.category === 'INDIAN')).toBe(true);
        });

        it('should search by price range', async () => {
            // Arrange
            mockSweetRepository.search.mockResolvedValue([mockSweets[1], mockSweets[2]]);

            // Act
            const result = await sweetsService.search({ minPrice: 30, maxPrice: 40 });

            // Assert
            expect(result.every(s => s.price >= 30 && s.price <= 40)).toBe(true);
        });

        it('should return empty array when no matches found', async () => {
            // Arrange
            mockSweetRepository.search.mockResolvedValue([]);

            // Act
            const result = await sweetsService.search({ search: 'NonExistent' });

            // Assert
            expect(result).toEqual([]);
        });
    });
});
