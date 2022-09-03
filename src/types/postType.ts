import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from "firebase/firestore";

export type postType = {
    author: string;
    author_icon: string | null;
    message: string;
    image_url: string | null;
    is_spoiler: boolean;
    /** おすすめする側 */
    recommender: string;
    /** おすすめされる側 */
    recommended_by: string[];
};

export const postTypeConverter: FirestoreDataConverter<postType> = {
    toFirestore: function (postData: postType): DocumentData {
        return {
            author: postData.author,
            author_icon: postData.author_icon,
            message: postData.message,
            image_url: postData.image_url,
            is_spoiler: postData.is_spoiler,
            recommended_by: postData.recommended_by,
            recommender: postData.recommender,
        };
    },
    fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): postType {
        const data = snapshot.data(options);
        return {
            author: data.author,
            author_icon: data.author_icon,
            message: data.message,
            image_url: data.image_url,
            is_spoiler: data.is_spoiler,
            recommended_by: data.recommended_by,
            recommender: data.recommender,
        };
    },
};
