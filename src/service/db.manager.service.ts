export interface DbManagerService {
    addNew<T>(
        tableName: string,
        entity: T
    ): Promise<T>;

    getEntityById<T>(
        tableName: string,
        id: string
    ): Promise<T>;

    getAllEntities<T>(
        tableName: string
    ): Promise<T[]>;

    deleteEntity<T>(
        tableName: string,
        entity: T
    ): Promise<boolean>;

    updateEntity<T>(
        tableName: string,
        entityId: string,
        newEntity: T
    ): Promise<T>;

    deleteById(
        tableName: string,
        id: string
    ): Promise<boolean>
}
