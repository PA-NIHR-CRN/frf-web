import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeBlockDataTransferSkeleton } from "./TypeBlockDataTransfer";
import type { TypeTextBlockSkeleton } from "./TypeTextBlock";

/**
 * Fields type definition for content type 'TypeServiceTypeBlock'
 * @name TypeServiceTypeBlockFields
 * @type {TypeServiceTypeBlockFields}
 * @memberof TypeServiceTypeBlock
 */
export interface TypeServiceTypeBlockFields {
    /**
     * Field type definition for field 'serviceType' (Service Type)
     * @name Service Type
     * @localized false
     */
    serviceType?: EntryFieldTypes.Symbol<"Find" | "Follow-Up" | "Recruit">;
    /**
     * Field type definition for field 'description' (Description)
     * @name Description
     * @localized false
     */
    description?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'howTheServiceWorks' (How the Service Works)
     * @name How the Service Works
     * @localized false
     */
    howTheServiceWorks?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'expectedTimelines' (Expected Timelines)
     * @name Expected Timelines
     * @localized false
     */
    expectedTimelines?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'costDescription' (Cost Description)
     * @name Cost Description
     * @localized false
     */
    costDescription?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'additionalInformation' (Additional Information)
     * @name Additional Information
     * @localized false
     */
    additionalInformation?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTextBlockSkeleton>>;
    /**
     * Field type definition for field 'dataProcessingActivities' (Data Processing Activities)
     * @name Data Processing Activities
     * @localized false
     */
    dataProcessingActivities?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeBlockDataTransferSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'serviceTypeBlock' (Block: Service Description)
 * @name TypeServiceTypeBlockSkeleton
 * @type {TypeServiceTypeBlockSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:55.014Z
 * @version 1
 */
export type TypeServiceTypeBlockSkeleton = EntrySkeletonType<TypeServiceTypeBlockFields, "serviceTypeBlock">;
/**
 * Entry type definition for content type 'serviceTypeBlock' (Block: Service Description)
 * @name TypeServiceTypeBlock
 * @type {TypeServiceTypeBlock}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:55.014Z
 * @version 1
 */
export type TypeServiceTypeBlock<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeServiceTypeBlockSkeleton, Modifiers, Locales>;
