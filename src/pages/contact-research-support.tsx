import Link from 'next/link'
import { Children, cloneElement, HTMLProps, isValidElement, ReactNode } from 'react'

import { Container } from '@/components/Container/Container'

function Fieldset({ children, legend }: { children: ReactNode; legend: string }) {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">{legend}</legend>
        {children}
      </fieldset>
    </div>
  )
}

function RadioGroup({ children, label, id, name }: { children: ReactNode } & HTMLProps<HTMLInputElement>) {
  return (
    <div className="govuk-radios" data-module="govuk-radios">
      {label && (
        <div className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--s" htmlFor={id}>
            {label}
          </label>
        </div>
      )}
      {Children.map(children, (child) =>
        isValidElement(child) ? (
          <>
            {cloneElement(child, {
              ...child.props,
              id,
              name,
            })}
          </>
        ) : null
      )}
    </div>
  )
}

function Radio({ label, id, value, name }: HTMLProps<HTMLInputElement>) {
  return (
    <div className="govuk-radios__item">
      <input type="radio" className="govuk-radios__input" id={id} name={name} value={value} />
      <label className="govuk-label govuk-radios__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

function Textarea({ id, name, label }: HTMLProps<HTMLTextAreaElement>) {
  return (
    <div className="govuk-form-group">
      <div className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--s" htmlFor={id}>
          {label}
        </label>
      </div>
      <textarea className="govuk-textarea" id={id} name={name} rows={5} />
    </div>
  )
}

function Select({ id, name, label, hint }: HTMLProps<HTMLTextAreaElement> & { hint?: ReactNode }) {
  return (
    <div className="govuk-form-group">
      <label className="govuk-label govuk-label--s" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <div id={`${id}-hint`} className="govuk-hint">
          {hint}
        </div>
      )}
      <select className="govuk-select" id={id} name={name} {...(hint && { 'aria-describedby': `${id}-hint` })}>
        <option value="choose" selected>
          Choose location
        </option>
        <option value="eastmidlands">East Midlands</option>
        <option value="eastofengland">East of England</option>
        <option value="london">London</option>
        <option value="northeast">North East</option>
        <option value="northwest">North West</option>
        <option value="southeast">South East</option>
        <option value="southwest">South West</option>
        <option value="westmidlands">West Midlands</option>
        <option value="yorkshire">Yorkshire and the Humber</option>
      </select>
    </div>

    // <div className="govuk-form-group">
    //   <div className="govuk-label-wrapper">
    //     <label className="govuk-label govuk-label--s" htmlFor={id}>
    //       {label}
    //     </label>
    //   </div>
    //   <textarea className="govuk-textarea" id={id} name={name} rows={5} />
    // </div>
  )
}

function TextInput({ id, name, label, hint }: HTMLProps<HTMLTextAreaElement> & { hint?: ReactNode }) {
  return (
    <div className="govuk-form-group">
      <div className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--s" htmlFor={id}>
          {label}
        </label>
        {hint && (
          <div id={`${id}-hint`} className="govuk-hint">
            {hint}
          </div>
        )}
      </div>
      <input
        type="text"
        className="govuk-input"
        id={id}
        name={name}
        {...(hint && { 'aria-describedby': `${id}-hint` })}
      />
    </div>
  )
}

export default function ContactResearchSupport() {
  return (
    <Container>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds-from-desktop">
          <h2 className="govuk-heading-l">Contact research support</h2>
          <p>
            The UK offers multiple services and teams of professionals who can support you with identifying appropriate
            data services or wider support with planning and delivering your study in the UK.
          </p>
          <p>
            If you would like to access this support please complete the form below and a professional from the relevant
            research support infrastructure will get in touch to respond to your request
          </p>
          <form action="/api/forms/contact" method="post">
            <h3 className="govuk-heading-l">About your enquiry</h3>
            <Fieldset legend="Where do you live?">
              <RadioGroup id="about" name="about">
                <Radio value="data-services" label="Identifying appropriate data services" />
                <Radio value="research-support" label="General research support" />
              </RadioGroup>
            </Fieldset>
            <Textarea label="Please provide a summary of the support you need" id="summary" name="summary" />
            <Fieldset legend="About you">
              <TextInput label="Full name" id="full-name" name="full-name" />
              <TextInput label="Email address" id="email-address" name="email-address" />
              <TextInput label="Job role" id="job-role" name="job-role" />
              <TextInput label="Organisation name" id="organisation-name" name="organisation-name" />

              <RadioGroup label="Is your organisation" id="is-your-organisation" name="is-your-organisation">
                <Radio value="commercial" label="Commercial" />
                <Radio value="non-commercial" label="Non-commercial" />
              </RadioGroup>
            </Fieldset>

            <Fieldset legend="About your research">
              <Select
                label="Which region will take a lead in supporting your research?"
                hint={
                  <>
                    <p>
                      This is the region within which the Chief Investigator or Clinical Trials Unit (CTU) is based (or
                      for Commercial Studies the lead region selected by the Sponsor).
                    </p>
                    <p>
                      If you are unsure which region to select, please visit{' '}
                      <a href="#">Local Clinical Research Networks</a> or email supportmystudy@nihr.ac.uk
                    </p>
                  </>
                }
              />

              <TextInput label="Study title (optional)" id="study-title" name="study-title" />
              <TextInput label="Protocol reference (optional)" id="protocol-reference" name="protocol-reference" />
              <TextInput
                label="CPMS ID (optional)"
                id="cpms-id"
                name="cpms-id"
                hint="A unique study identifier given to all eligible studies recorded on the NIHR CRN Central Portfolio Management
          System (CPMS) database."
              />
            </Fieldset>

            <p>We will email you a copy of this form for your records</p>

            <div className="govuk-button-group">
              <button className="govuk-button" data-module="govuk-button">
                Save and continue
              </button>
              <Link className="govuk-link" href="/">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
