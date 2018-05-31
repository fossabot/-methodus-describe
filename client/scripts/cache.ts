export class CacheManager {
    public render(element, data) {
        ($(element) as any).jsonViewer(data);
    }
}