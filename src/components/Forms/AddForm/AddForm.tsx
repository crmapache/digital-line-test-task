import React from 'react';
import { FormGrid, FormColumn, FormRow } from '@components/Forms/FormGrid';
import { FormInput, Form, FormSubmit, FormSelect } from '@components/Forms';
import { Form as FormInterface } from '@components/interfaces';
import { observer } from 'mobx-react';
import * as styles from './AddForm.module.scss';

interface AddFormProps {
  form: FormInterface;
}

function AddForm({ form }: AddFormProps): JSX.Element {
  return (
    <>
      {form.store.ready && (
        <div className={styles.addForm}>
          <Form form={form}>
            <FormGrid>
              <FormRow sizes={['sm12', 'md6']}>
                <FormColumn>
                  <FormInput name="name" />
                </FormColumn>
                <FormColumn>
                  <FormInput name="age" />
                </FormColumn>
              </FormRow>
              <FormRow sizes={['sm12', 'md6']}>
                <FormColumn>
                  <FormInput name="surname" />
                </FormColumn>
                <FormColumn>
                  <FormSelect name="city" />
                </FormColumn>
              </FormRow>
              <FormSubmit title="Save" />
            </FormGrid>
          </Form>
        </div>
      )}
    </>
  );
}

export default observer(AddForm);
