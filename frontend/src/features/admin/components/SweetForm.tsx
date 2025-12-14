import { useState, useEffect, FormEvent } from 'react';
import type { Sweet, SweetCategory } from '../../../types/sweet.types';
import styles from './SweetForm.module.css';

interface SweetFormProps {
    sweet?: Sweet;
    onSubmit: (data: Partial<Sweet>) => void;
    onCancel: () => void;
}

const categories: SweetCategory[] = ['INDIAN', 'WESTERN', 'FUSION', 'TRADITIONAL', 'MODERN'];

export function SweetForm({ sweet, onSubmit, onCancel }: SweetFormProps) {
    const [formData, setFormData] = useState({
        name: sweet?.name || '',
        description: sweet?.description || '',
        price: sweet?.price?.toString() || '',
        quantity: sweet?.quantity?.toString() || '',
        category: sweet?.category || 'INDIAN' as SweetCategory,
        imageUrl: sweet?.imageUrl || '',
    });

    useEffect(() => {
        if (sweet) {
            setFormData({
                name: sweet.name,
                description: sweet.description,
                price: sweet.price.toString(),
                quantity: sweet.quantity.toString(),
                category: sweet.category,
                imageUrl: sweet.imageUrl || '',
            });
        }
    }, [sweet]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            quantity: parseInt(formData.quantity) || 0,
            category: formData.category,
            imageUrl: formData.imageUrl || undefined,
        });
    };

    return (
        <div className={styles.formOverlay} onClick={onCancel}>
            <div className={styles.formContainer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.formHeader}>
                    <h2>{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
                    <button className={styles.closeBtn} onClick={onCancel} type="button">
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formContent}>
                        <div className={styles.form}>
                            {/* Row 1: Name and Category */}
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Sweet Name *</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., Gulab Jamun"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Category *</label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as SweetCategory })}
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row 2: Price and Quantity */}
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="price">Price (₹) *</label>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="50.00"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="quantity">Quantity (Stock) *</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="0"
                                        placeholder="100"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Description *</label>
                                <textarea
                                    id="description"
                                    placeholder="Describe this sweet..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div className={styles.formGroup}>
                                <label htmlFor="imageUrl">Image URL (Optional)</label>
                                <input
                                    id="imageUrl"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <small>Leave blank for default placeholder</small>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            {sweet ? 'Update Sweet' : 'Create Sweet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
