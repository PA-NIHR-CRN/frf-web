import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

import type { TypeInformationGovernanceBlockSkeleton } from "./TypeInformationGovernanceBlock";

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
    label: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'dataTransfer' (Rows)
     * @name Rows
     * @localized false
     */
    dataTransfer: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeInformationGovernanceBlockSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'blockDataTransfer' (Block: Data Processing Activity)
 * @name TypeBlockDataTransferSkeleton
 * @type {TypeBlockDataTransferSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:56.355Z
 * @version 1
 */
export type TypeBlockDataTransferSkeleton = EntrySkeletonType<TypeBlockDataTransferFields, "blockDataTransfer">;
/**
 * Entry type definition for content type 'blockDataTransfer' (Block: Data Processing Activity)
 * @name TypeBlockDataTransfer
 * @type {TypeBlockDataTransfer}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:56.355Z
 * @version 1
 */
export type TypeBlockDataTransfer<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeBlockDataTransferSkeleton, Modifiers, Locales>;
