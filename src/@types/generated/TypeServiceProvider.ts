import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

import type { TypeDataContentBlockSkeleton } from "./TypeDataContentBlock";
import type { TypeServiceTypeBlockSkeleton } from "./TypeServiceTypeBlock";

/**
 * Fields type definition for content type 'TypeServiceProvider'
 * @name TypeServiceProviderFields
 * @type {TypeServiceProviderFields}
 * @memberof TypeServiceProvider
 */
export interface TypeServiceProviderFields {
    /**
     * Field type definition for field 'name' (Name)
     * @name Name
     * @localized false
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (Slug)
     * @name Slug
     * @localized false
     */
    slug?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'searchKeywords' (Search Keywords)
     * @name Search Keywords
     * @localized false
     */
    searchKeywords?: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'providerOrganisation' (Provider Organisation)
     * @name Provider Organisation
     * @localized false
     */
    providerOrganisation: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'shortDescription' (Short Description)
     * @name Short Description
     * @localized false
     */
    shortDescription: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'fundedBy' (Funded by)
     * @name Funded by
     * @localized false
     */
    fundedBy?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'geography' (Geography)
     * @name Geography
     * @localized false
     */
    geography: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"England" | "Northern Ireland" | "Scotland" | "UK wide" | "Wales">>;
    /**
     * Field type definition for field 'geographySupportingText' (Geography Supporting Text)
     * @name Geography Supporting Text
     * @localized false
     */
    geographySupportingText?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'regionalCoverage' (Regional Coverage)
     * @name Regional Coverage
     * @localized false
     */
    regionalCoverage?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'population' (Population)
     * @name Population
     * @localized false
     */
    population?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'suitedTo' (Suited To)
     * @name Suited To
     * @localized false
     */
    suitedTo?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'notSuitedTo' (Not Suited To)
     * @name Not Suited To
     * @localized false
     */
    notSuitedTo?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'costs' (Costs)
     * @name Costs
     * @localized false
     */
    costs?: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"Find: Chargeable service" | "Find: Free of charge (All studies)" | "Find: Free of charge (non-commercial studies only)" | "Follow-Up: Chargeable service" | "Follow-Up: Free of charge (All studies)" | "Follow-Up: Free of charge (non-commercial studies only)" | "Recruit: Chargeable service" | "Recruit: Free of charge (All studies)" | "Recruit: Free of charge (non-commercial studies only)">>;
    /**
     * Field type definition for field 'findCostChargeableDescription' (Find Cost (Chargeable Description))
     * @name Find Cost (Chargeable Description)
     * @localized false
     */
    findCostChargeableDescription?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'recruitCostChargeableDescription' (Recruit Cost (Chargeable Description))
     * @name Recruit Cost (Chargeable Description)
     * @localized false
     */
    recruitCostChargeableDescription?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'followUpCostChargeableDescription' (Follow-Up Cost (Chargeable Description))
     * @name Follow-Up Cost (Chargeable Description)
     * @localized false
     */
    followUpCostChargeableDescription?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'typesOfDataAvailableList' (Data Types Available (List))
     * @name Data Types Available (List)
     * @localized false
     */
    typesOfDataAvailableList?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'typesOfDataAvailableDetail' (Data Types Available (Detail))
     * @name Data Types Available (Detail)
     * @localized false
     */
    typesOfDataAvailableDetail?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'videoUrl' (Video URL)
     * @name Video URL
     * @localized false
     */
    videoUrl?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'website' (Website URL)
     * @name Website URL
     * @localized false
     */
    website?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'websiteName' (Website Name)
     * @name Website Name
     * @localized false
     */
    websiteName?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'dataSpecificsAndCoding' (Data content)
     * @name Data content
     * @localized false
     */
    dataSpecificsAndCoding?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeDataContentBlockSkeleton>>;
    /**
     * Field type definition for field 'geographicAndPopulationCoverage' (Geographical and Population Coverage)
     * @name Geographical and Population Coverage
     * @localized false
     */
    geographicAndPopulationCoverage?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'informationGovernance' (Information Governance)
     * @name Information Governance
     * @localized false
     */
    informationGovernance?: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'serviceTypes' (Service Descriptions)
     * @name Service Descriptions
     * @localized false
     */
    serviceTypes?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeServiceTypeBlockSkeleton>>;
}

/**
 * Entry skeleton type definition for content type 'serviceProvider' (Service Provider)
 * @name TypeServiceProviderSkeleton
 * @type {TypeServiceProviderSkeleton}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:54.076Z
 * @version 73
 */
export type TypeServiceProviderSkeleton = EntrySkeletonType<TypeServiceProviderFields, "serviceProvider">;
/**
 * Entry type definition for content type 'serviceProvider' (Service Provider)
 * @name TypeServiceProvider
 * @type {TypeServiceProvider}
 * @author 0e5NmQEjI50YvjZsuXVNKL
 * @since 2023-06-05T14:41:54.076Z
 * @version 73
 */
export type TypeServiceProvider<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeServiceProviderSkeleton, Modifiers, Locales>;
