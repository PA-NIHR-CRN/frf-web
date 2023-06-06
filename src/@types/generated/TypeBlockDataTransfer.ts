import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeInformationGovernanceBlockSkeleton } from './TypeInformationGovernanceBlock'

/**
 * Fields type definition for content type 'TypeBlockDataTransfer'
 * @name TypeBlockDataTransferFields
 * @type {TypeBlockDataTransferFields}
 * @memberof TypeBlockDataTransfer
 */
export interface TypeBlockDataTransferFields {
  /**
   * Field type definition for field 'label' (Label)
   * @name Label
   * @localized false
   */
  label: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'dataTransfer' (Rows)
   * @name Rows
   * @localized false
   */
  dataTransfer: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeInformationGovernanceBlockSkeleton>>
}

/**
 * Entry skeleton type definition for content type 'blockDataTransfer' (Block: Data Processing Activity)
 * @name TypeBlockDataTransferSkeleton
 * @type {TypeBlockDataTransferSkeleton}
 * @author 3rpQC8obq2zEXdKxJoK0cC
 * @since 2023-01-25T15:20:38.437Z
 * @version 7
 */
export type TypeBlockDataTransferSkeleton = EntrySkeletonType<TypeBlockDataTransferFields, 'blockDataTransfer'>
/**
 * Entry type definition for content type 'blockDataTransfer' (Block: Data Processing Activity)
 * @name TypeBlockDataTransfer
 * @type {TypeBlockDataTransfer}
 * @author 3rpQC8obq2zEXdKxJoK0cC
 * @since 2023-01-25T15:20:38.437Z
 * @version 7
 */
export type TypeBlockDataTransfer<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeBlockDataTransferSkeleton,
  Modifiers,
  Locales
>
