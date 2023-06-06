import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'
import type { TypeBlockDataTransferSkeleton } from './TypeBlockDataTransfer'

/**
 * Fields type definition for content type 'TypeInformationGovernanceDataSource'
 * @name TypeInformationGovernanceDataSourceFields
 * @type {TypeInformationGovernanceDataSourceFields}
 * @memberof TypeInformationGovernanceDataSource
 */
export interface TypeInformationGovernanceDataSourceFields {
  /**
   * Field type definition for field 'patientDataSource' (Patient Data Source)
   * @name Patient Data Source
   * @localized false
   */
  patientDataSource?: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'controller' (Controller)
   * @name Controller
   * @localized false
   */
  controller?: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'typeOfData' (Type of data)
   * @name Type of data
   * @localized false
   */
  typeOfData?: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'basisOfCollection' (Basis of collection)
   * @name Basis of collection
   * @localized false
   */
  basisOfCollection?: EntryFieldTypes.Symbol
  /**
   * Field type definition for field 'dataProcessingActivities' (Data Processing Activities)
   * @name Data Processing Activities
   * @localized false
   */
  dataProcessingActivities?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlockDataTransferSkeleton>>
}

/**
 * Entry skeleton type definition for content type 'informationGovernanceDataSource' (Block: Information Governance Overview)
 * @name TypeInformationGovernanceDataSourceSkeleton
 * @type {TypeInformationGovernanceDataSourceSkeleton}
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-21T16:03:16.241Z
 * @version 17
 */
export type TypeInformationGovernanceDataSourceSkeleton = EntrySkeletonType<
  TypeInformationGovernanceDataSourceFields,
  'informationGovernanceDataSource'
>
/**
 * Entry type definition for content type 'informationGovernanceDataSource' (Block: Information Governance Overview)
 * @name TypeInformationGovernanceDataSource
 * @type {TypeInformationGovernanceDataSource}
 * @author 0zJLEPni9gpYje1wygnRvu
 * @since 2022-12-21T16:03:16.241Z
 * @version 17
 */
export type TypeInformationGovernanceDataSource<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
  TypeInformationGovernanceDataSourceSkeleton,
  Modifiers,
  Locales
>
