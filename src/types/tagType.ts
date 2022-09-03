import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

export type tagType = {
    followers: string[];
};

export const tagConverter: FirestoreDataConverter<tagType> = {
    toFirestore: function (tagData: tagType): DocumentData {
        return {
            followers: tagData.followers,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): tagType {
        const data = snapshot.data(options);
        return {
            followers: data.followers,
        };
    },
};
