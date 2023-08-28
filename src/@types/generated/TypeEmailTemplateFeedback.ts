import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeEmailTemplateFeedback'
 * @name TypeEmailTemplateFeedbackFields
 * @type {TypeEmailTemplateFeedbackFields}
 * @memberof TypeEmailTemplateFeedback
 */
export interface TypeEmailTemplateFeedbackFields {
    /**
     * Field type definition for field 'title' (Title)
     * @name Title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'sourceInbox' (Source inbox)
     * @name Source inbox
     * @localized false
     */
    sourceInbox: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'recipients' (Recipients)
     * @name Recipients
     * @localized false
     */
    recipients: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'subject' (Subject)
     * @name Subject
     * @localized false
     */
    subject: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'body' (Body)
     * @name Body
     * @localized false
     */
    body: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'signature' (Signature)
     * @name Signature
     * @localized false
     */
    signature: EntryFieldTypes.RichText;
    /**
     * Field type definition for field 'signatureLogo' (Signature Logo)
     * @name Signature Logo
     * @localized false
     */
    signatureLogo?: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'emailTemplateFeedback' (Email Template - Feedback)
 * @name TypeEmailTemplateFeedbackSkeleton
 * @type {TypeEmailTemplateFeedbackSkeleton}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-21T14:56:46.388Z
 * @version 53
 */
export type TypeEmailTemplateFeedbackSkeleton = EntrySkeletonType<TypeEmailTemplateFeedbackFields, "emailTemplateFeedback">;
/**
 * Entry type definition for content type 'emailTemplateFeedback' (Email Template - Feedback)
 * @name TypeEmailTemplateFeedback
 * @type {TypeEmailTemplateFeedback}
 * @author 2MXTjjyvpmOzLPW2qSiIPI
 * @since 2023-08-21T14:56:46.388Z
 * @version 53
 */
export type TypeEmailTemplateFeedback<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeEmailTemplateFeedbackSkeleton, Modifiers, Locales>;
