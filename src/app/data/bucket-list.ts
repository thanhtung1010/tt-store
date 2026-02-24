import { BUCKET_LIST_STATUS } from "@enums";
import { IBucketListItem } from "@interfaces";
import { arraySignal } from "@signals";

export const BUCKET_LIST_DATA = arraySignal<IBucketListItem>([
    {
        text: 'MAIN.BUCKET.ITEM_1',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_2',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_3',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_4',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_5',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_6',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_7',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_8',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_9',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_10',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_11',
        status: BUCKET_LIST_STATUS.COMPLETED,
        svg: '/assets/svg/checked.svg',
        color: 'text-green-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_12',
        status: BUCKET_LIST_STATUS.COMPLETED,
        svg: '/assets/svg/checked.svg',
        color: 'text-green-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_13',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_14',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_15',
        status: BUCKET_LIST_STATUS.IN_PROGRESS,
        svg: '/assets/svg/check.svg',
        color: 'text-yellow-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_16',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_17',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_18',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_19',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_20',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_21',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
    {
        text: 'MAIN.BUCKET.ITEM_22',
        status: BUCKET_LIST_STATUS.TODO,
        svg: '/assets/svg/check.svg',
        color: 'text-gray-500',
    },
]);