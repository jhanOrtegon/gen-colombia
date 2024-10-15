import { Button, Grid, Popover, Row, Text } from '@nextui-org/react';

export const DeleteNote = ({children, onDelete }:any) =>{
    
  return(
    <Popover>
      <Popover.Trigger>
        {children}
      </Popover.Trigger>
      <Popover.Content>
        <Grid.Container
          css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}
        >
          <Row justify="center" align="center">
            <Text b>Información</Text>
          </Row>
          <Row>
            <Text>
                ¿Está seguro de que desea eliminar esta nota? Al hacer esto, no podrá recuperar los datos.
            </Text>
          </Row>
          <Grid.Container className='mt-3' justify="space-between" alignContent="center">
            <Grid>
              <Button size="sm" light>
                Cancelar
              </Button>
            </Grid>
            <Grid>
              <Button 
                onPress={()=>{
                  onDelete();
                }}  
                size="sm" shadow color="error">
                Eliminar
              </Button>
            </Grid>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  );
};