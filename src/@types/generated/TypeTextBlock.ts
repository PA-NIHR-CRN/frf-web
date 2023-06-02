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
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-20T16:49:07.740Z
 * @version 5
 */
export type TypeTextBlockSkeleton = EntrySkeletonType<TypeTextBlockFields, "textBlock">;
/**
 * Entry type definition for content type 'textBlock' (Block: Text)
 * @name TypeTextBlock
 * @type {TypeTextBlock}
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-20T16:49:07.740Z
 * @version 5
 */
export type TypeTextBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextBlockSkeleton, Modifiers, Locales>;
