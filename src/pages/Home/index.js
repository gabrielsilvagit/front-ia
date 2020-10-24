import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Select } from 'formik-antd';
import { Col, Spin, message } from 'antd';
import 'moment/locale/pt-br';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import FormControl from '~/components/Form/FormControl';
import Row from '~/components/Row';
import Button from '~/components/Button';
import DefautLayout from '~/pages/_layouts/full';
import { ButtonsForm } from './styles';
import Box from '~/components/Box';
import { Table } from '~/components/Table';
import handleError from '~/Utils/errorHandler';
import api from '~/services/api';
import { dynamicCost } from '~/Utils';
import InputCurrency from '~/components/Form/InputCurrency';
import { formatPrice } from 'Utils';

const initialValues = {
  type: '',
  brand: '',
  cPrice: '',
  validate: '',
};
export default function Home() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [datas, setDatas] = useState([]);
  const [price, setPrice] = useState([]);
  const { Option } = Select;

  const handleSearch = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/price', values);
      const { data } = response;
      message.success(`O preço ideal sugerido é: ${formatPrice(data.price)}`);
      setPrice(data);
      fetchRecords();
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get('/itens');
      const { data } = response;
      data.map((item) => {
        switch (item.itens_type) {
          case '1':
            item.type = { id: 1, name: 'Leite' };
        }
        switch (item.itens_brand) {
          case '1':
            item.brand = { id: 1, name: 'Parmalat' };
            break;
          case '2':
            item.brand = { id: 2, name: 'Italac' };
            break;
          case '3':
            item.brand = { id: 3, name: 'Nestlé' };
            break;
        }
        switch (item.validate) {
          case '1':
            item.validate = { id: 1, name: '30 Dias' };
            break;
          case '2':
            item.validate = { id: 2, name: '60 Dias' };
            break;
          case '3':
            item.validate = { id: 3, name: '90 Dias' };
            break;
        }
      });
      setRecordData(data);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const fetchMarcas = async () => {
    setMarcas([
      { id: 1, name: 'Parmalat' },
      { id: 2, name: 'Italac' },
      { id: 3, name: 'Nestlé' },
    ]);
  };

  const fetchTipos = () => {
    setTipos([{ id: 1, name: 'Leite' }]);
  };

  const fetchDatas = () => {
    setDatas([
      { id: 1, name: '30 dias' },
      { id: 2, name: '60 dias' },
      { id: 3, name: '90 dias' },
    ]);
  };

  const validateFields = (values) => {
    const errors = {};
    if (!values.type) {
      errors.type = 'Campo obrigatorio';
    }
    if (!values.brand) {
      errors.brand = 'Campo obrigatorio';
    }
    if (!values.cPrice) {
      errors.cPrice = 'Campo obrigatorio';
    }
    if (!values.validate) {
      errors.validate = 'Campo obrigatorio';
    }
    return errors;
  };

  useEffect(() => {
    fetchMarcas();
    fetchTipos();
    fetchDatas();
    fetchRecords();
  }, []);

  const tableColumns = [
    {
      title: 'Tipo',
      key: 'itens_type',
      dataIndex: 'itens_type',
      render: (text, record) => {
        return <span>{record.type && record.type.name}</span>;
      },
    },
    {
      title: 'Marca',
      key: 'itens_brand',
      dataIndex: 'itens_brand',
      render: (text, record) => {
        return <span>{record.brand && record.brand.name}</span>;
      },
    },
    {
      title: 'Custo',
      key: 'itens_cost_price',
      dataIndex: 'itens_cost_price',
      render: (text, record) => {
        return <span>{formatPrice(text)}</span>;
      },
    },
    {
      title: 'Preço Sugerido',
      key: 'itens_price',
      dataIndex: 'itens_price',
      render: (text, record) => {
        return <span>{formatPrice(text)}</span>;
      },
    },
    {
      title: 'Validade',
      key: 'validate',
      dataIndex: 'validate',
      render: (text, record) => {
        return <span>{record.validate && record.validate.name}</span>;
      },
    },
  ];

  return (
    <DefautLayout>
      <Box>
        <Formik initialValues={{}}>
          {({ errors, values, setValues, resetForm, setErrors }) => (
            <Spin spinning={loading}>
              <Row>
                <FormControl error={errors.type} field="type" label="Tipo" cols={{ xl: 5 }}>
                  <Select name="type" placeholder={'Selecione...'}>
                    {tipos.map((item) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl error={errors.brand} field="brand" label="Marca" cols={{ xl: 5 }}>
                  <Select name="brand" placeholder={'Selecione...'}>
                    {marcas.map((item) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl error={errors.cPrice} field="cPrice" label="Custo" cols={{ xl: 5 }}>
                  <InputCurrency
                    placeholder={'Custo'}
                    name="cPrice"
                    currency="R$"
                    number={false}
                    onChange={(event) => {
                      setValues({ ...values, cPrice: dynamicCost(event.target.value) });
                    }}
                  />
                </FormControl>
                <FormControl error={errors.validate} field="validate" label="Validade" cols={{ xl: 5 }}>
                  <Select name="validate" placeholder={'Selecione...'}>
                    {datas.map((item) => {
                      return (
                        <Option key={item.id} value={item.id.toString()}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormControl>
                <Col xl={4}>
                  <Row>
                    <ButtonsForm>
                      <Button
                        color="primary"
                        onClick={() => {
                          var error = validateFields(values);
                          setErrors(error);
                          if (Object.keys(error).length === 0) {
                            handleSearch(values);
                            resetForm();
                          }
                        }}
                      >
                        Enviar
                      </Button>
                      <Button
                        color="default"
                        style={{ marginLeft: '15px' }}
                        onClick={() => {
                          setValues([]);
                        }}
                      >
                        Limpar
                      </Button>
                    </ButtonsForm>
                  </Row>
                </Col>
              </Row>
            </Spin>
          )}
        </Formik>
      </Box>
      <Box showForm={recordData.length > 0 ? 'block' : 'none'}>
        <Table rowKey="id" loading={loading} columns={tableColumns} dataSource={recordData} />
      </Box>
    </DefautLayout>
  );
}
