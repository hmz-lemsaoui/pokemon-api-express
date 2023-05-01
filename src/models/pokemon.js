const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fee']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {msg: 'le nom ne peut pas etre vide.'},
                notNull: {msg: 'le nom est une propriete requise.'}
            },
            unique: {
                msg: 'le nom de pokemon est deja pris.'
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres pour les points de vie.'},
                min: {
                    args: [0],
                    msg: 'les points de vie doivent etre superieurs au egales a 0'
                },
                max: {
                    args: [999],
                    msg: 'les points de vie doivent etre inferieurs au egales a 999'
                },
                notNull: {msg: 'les points de vie sont une propriete requise.'}
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres pour les degats.'},
                min: {
                    args: [0],
                    msg: 'les points de degat doivent etre superieurs au egales a 0.'
                },
                max: {
                    args: [99],
                    msg: 'les points de degat doivent etre inferieurs au egales a 99.'
                },
                notNull: {msg: 'les degats sont une propriete requise.'}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Utiliser uniquement les urls valide.'},
                notNull: {msg: 'l\'url est une propriete requise.'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return this.getDataValue('types').split(',')
            },
            set(types){
                this.setDataValue('types',types.join())
            },
            validate: {
                isTypeValid(value){
                    if (!value){
                        throw new Error("Un pokemon dois au moins avoir un type.")
                    }
                    if (value.split(',').length > 3){
                        throw new Error("Un pokemon ne peus pas avoir plus de trois types.")
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)){
                            new Error(`le type d'un pokemon doit appartenir a la liste suivante: ${validTypes}`);
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}