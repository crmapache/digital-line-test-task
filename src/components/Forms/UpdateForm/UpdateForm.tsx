import React, { useEffect } from 'react';
import { FormGrid, FormColumn, FormRow } from '@components/Forms/FormGrid';
import { FormInput, Form, FormSubmit, FormSelect, FormCheckbox } from '@components/Forms';
import { useForm } from '@components/Forms/hooks';
import { observer } from 'mobx-react';
import FormStore from '@components/Forms/FormStore';
import {
  FormStore as FormStoreInterface,
  Form as FormInterface,
  TableRecord,
  FormData,
} from '@components/interfaces';
import appStore from '@components/Sections/App/AppStore';

const formStore: FormStoreInterface = new FormStore();

interface UpdateFormProps {
  record: TableRecord;
  tableIndex: number;
  recordIndex: number;
  closeModal: () => void;
}

function UpdateForm({ record, tableIndex, recordIndex, closeModal }: UpdateFormProps) {
  useEffect(() => {
    formStore.setFields({
      name: {
        value: record.name,
        type: 'text',
        placeholder: 'Name',
        attributes: {
          maxLength: 100,
        },
        validation: {
          rules: [
            { name: 'required', error: 'You must fill your name' },
            { name: 'min', payload: 2, error: 'Name must be longer than 2 symbols' },
          ],
        },
      },
      agree: {
        value: false,
        label: 'Totally agree',
        validation: {
          rules: [{ name: 'checked', error: 'You must be totally agree' }],
        },
      },
      surname: {
        value: record.surname,
        type: 'text',
        placeholder: 'Surname',
        attributes: {
          maxLength: 100,
        },
        validation: {
          rules: [
            { name: 'required', error: 'You must fill your surname' },
            { name: 'min', payload: 2, error: 'Surname must be longer than 2 symbols' },
          ],
        },
      },
      city: {
        value: [record.city],
        placeholder: 'City',
        options: ['Riga', 'Daugavpils', 'Jūrmala', 'Ventspils'],
        validation: {
          rules: [{ name: 'selected', error: 'You must select city' }],
        },
        notEmpty: false,
      },
    });
    formStore.setSubmit({
      onSubmit: (values: FormData) => {
        return new Promise<void>((resolve, reject) => {
          resolve();

          const city = values.city as string[];

          appStore.updateTableRecord(tableIndex, recordIndex, {
            name: values.name as string,
            surname: values.surname as string,
            city: city[0],
          });

          closeModal();
        });
      },
    });
    formStore.setReady(true);
  }, [record]);

  const form: FormInterface = useForm(formStore);

  return (
    <>
      {formStore.ready && (
        <Form form={form}>
          <FormGrid>
            <FormRow sizes={['sm12', 'md4']}>
              <FormColumn>
                <FormInput name="name" />
              </FormColumn>
              <FormColumn>
                <FormInput name="surname" />
              </FormColumn>
              <FormColumn>
                <FormSelect name="city" />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <FormCheckbox name="agree" />
              </FormColumn>
            </FormRow>
            <FormSubmit title="Save" />
          </FormGrid>
        </Form>
      )}
    </>
  );
}

export default observer(UpdateForm);
