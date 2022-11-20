import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

export type allTagsType = {
    tags: string[];
};

export const allTagsConverter: FirestoreDataConverter<allTagsType> = {
    toFirestore: (allTagData: allTagsType): DocumentData => {
        return {
            tags: allTagData.tags,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): allTagsType => {
        const data = snapshot.data(options);
        return {
            tags: data.tags,
        };
    },
};
