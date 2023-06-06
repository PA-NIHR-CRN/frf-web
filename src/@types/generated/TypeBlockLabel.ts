import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

/**
 * Fields type definition for content type 'TypeBlockLabel'
 * @name TypeBlockLabelFields
 * @type {TypeBlockLabelFields}
 * @memberof TypeBlockLabel
 */
export interface TypeBlockLabelFields {
  /**
   * Field type definition for field 'label' (Label)
   * @name Label
   * @localized false
   */
  label: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'description' (Description)
   * @name Description
   * @localized false
   */
  description?: EntryFieldTypes.Text
}

/**
 * Entry skeleton type definition for content type 'blockLabel' (Block: Label)
 * @name TypeBlockLabelSkeleton
 * @type {TypeBlockLabelSkeleton}
 * @author 3rpQC8obq2zEXdKxJoK0cC
 * @since 2023-01-25T15:20:39.291Z
 * @version 3
 */
export type TypeBlockLabelSkeleton = EntrySkeletonType<TypeBlockLabelFields, 'blockLabel'>
/**
 * Entry type definition for content type 'blockLabel' (Block: Label)
 * @name TypeBlockLabel
 * @type {TypeBlockLabel}
 * @author 3rpQC8obq2zEXdKxJoK0cC
 * @since 2023-01-25T15:20:39.291Z
 * @version 3
 */
export type TypeBlockLabel<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeBlockLabelSkeleton,
  Modifiers,
  Locales
>
