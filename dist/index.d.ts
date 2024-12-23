type AnyObject = {
    [key: string]: any;
};
interface Config {
    fullObjectReplace?: boolean;
    fullArrayReplace?: boolean;
}
declare function deepCompareAndRemove(obj1: AnyObject, obj2: AnyObject, config?: Config): AnyObject;
export { deepCompareAndRemove, AnyObject, Config };
