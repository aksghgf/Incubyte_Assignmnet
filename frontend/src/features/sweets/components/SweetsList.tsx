import { useState } from 'react';
import type { Sweet } from '../../../types/sweet.types';
import { SweetCard } from './SweetCard';
import { Spinner } from '../../../components/ui/Spinner';
import { Input } from '../../../components/ui/Input';
import styles from './SweetsList.module.css';

interface SweetsListProps {
    sweets: Sweet[];
    isLoading?: boolean;
    onPurchase?: (id: string) => void;
    onEdit?: (sweet: Sweet) => void;
    onDelete?: (id: string) => void;
    isAdmin?: boolean;
}

export function SweetsList({
    sweets,
    isLoading,
    onPurchase,
    onEdit,
    onDelete,
    isAdmin
}: SweetsListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Get unique categories
    const categories = Array.from(new Set(sweets.map(s => s.category)));

    // Filter sweets
    const filteredSweets = sweets.filter(sweet => {
        const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sweet.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || sweet.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (isLoading) {
        return <Spinner size="large" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <Input
                    placeholder="Search sweets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />

                <select
                    className={styles.categoryFilter}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {filteredSweets.length === 0 ? (
                <p className={styles.emptyMessage}>No sweets found</p>
            ) : (
                <div className={styles.grid}>
                    {filteredSweets.map(sweet => (
                        <SweetCard
                            key={sweet.id}
                            sweet={sweet}
                            onPurchase={onPurchase}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
