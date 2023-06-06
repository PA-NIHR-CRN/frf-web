import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeBlockLabelSkeleton } from './TypeBlockLabel'

/**
 * Fields type definition for content type 'TypeInformationGovernanceBlock'
 * @name TypeInformationGovernanceBlockFields
 * @type {TypeInformationGovernanceBlockFields}
 * @memberof TypeInformationGovernanceBlock
 */
export interface TypeInformationGovernanceBlockFields {
  /**
   * Field type definition for field 'label' (Label)
   * @name Label
   * @localized false
   */
  label: EntryFieldTypes.EntryLink<TypeBlockLabelSkeleton>
  /**
   * Field type definition for field 'required' (Required)
   * @name Required
   * @localized false
   */
  required?: EntryFieldTypes.Boolean
  /**
   * Field type definition for field 'notes' (Notes)
   * @name Notes
   * @localized false
   */
  notes?: EntryFieldTypes.Symbol
}

/**
 * Entry skeleton type definition for content type 'informationGovernanceBlock' (Block: Information Governance Row)
 * @name TypeInformationGovernanceBlockSkeleton
 * @type {TypeInformationGovernanceBlockSkeleton}
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-21T16:16:48.886Z
 * @version 15
 */
export type TypeInformationGovernanceBlockSkeleton = EntrySkeletonType<
  TypeInformationGovernanceBlockFields,
  'informationGovernanceBlock'
>
/**
 * Entry type definition for content type 'informationGovernanceBlock' (Block: Information Governance Row)
 * @name TypeInformationGovernanceBlock
 * @type {TypeInformationGovernanceBlock}
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-21T16:16:48.886Z
 * @version 15
 */
export type TypeInformationGovernanceBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeInformationGovernanceBlockSkeleton,
  Modifiers,
  Locales
>
