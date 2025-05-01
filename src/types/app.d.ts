/// <reference types="nativewind/types" />

interface IResponsePage<T> {
    results: T;
    count: number;
    next: null | string;
    previous: null | string;
}