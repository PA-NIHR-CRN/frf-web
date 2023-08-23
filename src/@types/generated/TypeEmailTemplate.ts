import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailTemplate'
 * @name TypeEmailTemplateFields
 * @type {TypeEmailTemplateFields}
 * @memberof TypeEmailTemplate
 */
export interface TypeEmailTemplateFields {
    /**
     * Field type definition for field 'recipients' (Recipients)
     * @name Recipients
     * @localized false
     */
    recipients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'senderSubject' (Sender Subject)
     * @name Sender Subject
     * @localized false
     */
    senderSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'senderBody' (Sender Body)
     * @name Sender Body
     * @localized false
     */
    senderBody: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'teamSubject' (Team Subject)
     * @name Team Subject
     * @localized false
     */
    teamSubject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'teamBody' (Team Body)
     * @name Team Body
     * @localized false
     */
    teamBody: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'signature' (Signature)
     * @name Signature
     * @localized false
     */
    signature: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'emailTemplate' (Email Template - Contact FRF Central Team)
 * @name TypeEmailTemplateSkeleton
 * @type {TypeEmailTemplateSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-18T11:42:07.910Z
 * @version 115
 */
export type TypeEmailTemplateSkeleton = EntrySkeletonType<TypeEmailTemplateFields, "emailTemplate">;
/**
 * Entry type definition for content type 'emailTemplate' (Email Template - Contact FRF Central Team)
 * @name TypeEmailTemplate
 * @type {TypeEmailTemplate}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-18T11:42:07.910Z
 * @version 115
 */
export type TypeEmailTemplate<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailTemplateSkeleton, Modifiers, Locales>;
