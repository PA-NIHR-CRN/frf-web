import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeTextBlock'
 * @name TypeTextBlockFields
 * @type {TypeTextBlockFields}
 * @memberof TypeTextBlock
 */
export interface TypeTextBlockFields {
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
 * Entry skeleton type definition for content type 'textBlock' (Block: Text)
 * @name TypeTextBlockSkeleton
 * @type {TypeTextBlockSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:54.613Z
 * @version 1
 */
export type TypeTextBlockSkeleton = EntrySkeletonType<TypeTextBlockFields, "textBlock">;
/**
 * Entry type definition for content type 'textBlock' (Block: Text)
 * @name TypeTextBlock
 * @type {TypeTextBlock}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:54.613Z
 * @version 1
 */
export type TypeTextBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextBlockSkeleton, Modifiers, Locales>;
