import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';
import { Brand } from './brand';

export interface ProductData extends Model {
    id: number;
    name: string;
    description: string;
    price: number;
}

export const Product = sequelize.define<ProductData>(
    'productData',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'product',
        timestamps: false,
    },
);
Product.belongsTo(Brand, { foreignKey: 'brandId', onDelete: 'SET NULL' });

// sequelize.sync();
