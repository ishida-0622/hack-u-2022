import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

export type allTagsType = {
    tags: string[];
};

export const allTagConverter: FirestoreDataConverter<allTagsType> = {
    toFirestore: function (allTagData: allTagsType): DocumentData {
        return {
            tags: allTagData.tags,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): allTagsType {
        const data = snapshot.data(options);
        return {
            tags: data.tags,
        };
    },
};
