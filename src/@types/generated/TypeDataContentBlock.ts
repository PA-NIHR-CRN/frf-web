import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeDataContentBlock'
 * @name TypeDataContentBlockFields
 * @type {TypeDataContentBlockFields}
 * @memberof TypeDataContentBlock
 */
export interface TypeDataContentBlockFields {
    /**
     * Field type definition for field 'heading' (Heading)
     * @name Heading
     * @localized false
     */
    heading?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'text' (Text)
     * @name Text
     * @localized false
     */
    text?: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'dataContentBlock' (Block: Data Content)
 * @name TypeDataContentBlockSkeleton
 * @type {TypeDataContentBlockSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-13T18:18:21.259Z
 * @version 1
 */
export type TypeDataContentBlockSkeleton = EntrySkeletonType<TypeDataContentBlockFields, "dataContentBlock">;
/**
 * Entry type definition for content type 'dataContentBlock' (Block: Data Content)
 * @name TypeDataContentBlock
 * @type {TypeDataContentBlock}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-07-13T18:18:21.259Z
 * @version 1
 */
export type TypeDataContentBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeDataContentBlockSkeleton, Modifiers, Locales>;
