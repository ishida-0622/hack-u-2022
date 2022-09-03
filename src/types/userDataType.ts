import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

export type userDataType = {
    name: string;
    image_url: string;
    follows: string[];
    mutes: string[];
};

export const userDataConverter: FirestoreDataConverter<userDataType> = {
    toFirestore: function (userData: userDataType): DocumentData {
        return {
            name: userData.name,
            follows: userData.follows,
            mutes: userData.mutes,
            image_url: userData.image_url,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): userDataType {
        const data = snapshot.data(options);
        return {
            name: data.name,
            follows: data.follows,
            mutes: data.mutes,
            image_url: data.image_url,
        };
    },
};
