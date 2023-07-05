import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';
import { Brand } from './brand';
export interface productData extends Model {
    id: number;
    name: string;
    description: string;
    price: Number;
}

export const Product = sequelize.define<productData>(
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
    },
    {
        tableName: 'product',
        timestamps: false,
    },
);
Product.belongsTo(Brand, { foreignKey: 'brandId' });

// sequelize.sync();
